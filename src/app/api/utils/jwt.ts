import jwt from 'jsonwebtoken'

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secret-key'

export function signJwt(payload: object, expiresIn: string = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions)
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
