import { cookies } from 'next/headers'
import crypto from 'node:crypto'
import { getDatabase, verifyPassword, hashPassword } from '@/lib/sqlite-db'

export const SESSION_COOKIE_NAME = 'primelense_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

export interface CurrentAdmin {
  id: string
  username: string
  role: string
}

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  const db = getDatabase()
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as any

  if (!admin) {
    return { success: false, error: 'Invalid username or password' }
  }

  const isValid = verifyPassword(password, admin.password_hash, admin.salt)
  if (!isValid) {
    return { success: false, error: 'Invalid username or password' }
  }

  // Create session
  const sessionId = 'ses-' + crypto.randomUUID()
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const createdAt = new Date().toISOString()

  db.prepare('INSERT INTO sessions (id, admin_id, expires_at, created_at) VALUES (?, ?, ?, ?)').run(
    sessionId,
    admin.id,
    expiresAt,
    createdAt
  )

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })

  return { success: true }
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  if (!sessionCookie?.value) return null

  const db = getDatabase()
  const now = Math.floor(Date.now() / 1000)

  const session = db
    .prepare(`
      SELECT s.id, s.expires_at, a.id as admin_id, a.username, a.role
      FROM sessions s
      JOIN admins a ON s.admin_id = a.id
      WHERE s.id = ? AND s.expires_at > ?
    `)
    .get(sessionCookie.value, now) as any

  if (!session) return null

  return {
    id: session.admin_id,
    username: session.username,
    role: session.role,
  }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  if (sessionCookie?.value) {
    const db = getDatabase()
    db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionCookie.value)
  }
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function changeAdminPassword(
  adminId: string,
  oldPass: string,
  newPass: string
): Promise<{ success: boolean; error?: string }> {
  if (newPass.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' }
  }

  const db = getDatabase()
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(adminId) as any
  if (!admin) return { success: false, error: 'Admin account not found.' }

  if (!verifyPassword(oldPass, admin.password_hash, admin.salt)) {
    return { success: false, error: 'Current password is incorrect.' }
  }

  const newSalt = crypto.randomBytes(16).toString('hex')
  const newHash = hashPassword(newPass, newSalt)

  db.prepare('UPDATE admins SET password_hash = ?, salt = ? WHERE id = ?').run(newHash, newSalt, adminId)
  return { success: true }
}
