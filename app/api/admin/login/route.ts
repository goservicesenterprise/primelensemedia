import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password required' }, { status: 400 })
    }

    const res = await loginAdmin(username, password)
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 })
  }
}
