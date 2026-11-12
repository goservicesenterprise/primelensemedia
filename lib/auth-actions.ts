'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { loginAdmin, logoutAdmin, changeAdminPassword, getCurrentAdmin } from '@/lib/auth'

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { success: false, error: 'Please enter both username and password.' }
  }

  const result = await loginAdmin(username, password)
  if (result.success) {
    redirect('/admin')
  }
  return result
}

export async function logoutAction() {
  await logoutAdmin()
  redirect('/admin/login')
}

export async function changePasswordAction(oldPass: string, newPass: string) {
  const current = await getCurrentAdmin()
  if (!current) {
    return { success: false, error: 'Unauthorized' }
  }

  return changeAdminPassword(current.id, oldPass, newPass)
}
