import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // TODO: Add actual registration logic here
    // This is just a mock response
    const response = NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: '2',
        name,
        email,
        role: 'user',
      },
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 