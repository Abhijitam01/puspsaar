import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth
 * Handle login requests
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, action } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (action === 'signup') {
      // TODO: Create user in database
      return NextResponse.json({
        message: 'Account created successfully',
        user: {
          id: Date.now().toString(),
          email,
        },
      }, { status: 201 });
    }

    // Login flow
    // TODO: Validate credentials against database
    // For now, accept any credentials
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: '1',
        email,
        name: 'User',
      },
      token: 'mock-jwt-token',
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/auth
 * Get current user (check auth status)
 */
export async function GET(request: NextRequest) {
  // TODO: Validate JWT token from headers/cookies
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json(
      { message: 'Not authenticated' },
      { status: 401 }
    );
  }

  // Mock authenticated user
  return NextResponse.json({
    user: {
      id: '1',
      email: 'user@velaire.house',
      name: 'User',
    },
  });
}

