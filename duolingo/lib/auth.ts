import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: number
  email: string
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { 
    expiresIn: '7d' 
  })
}
