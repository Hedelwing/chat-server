import { AuthenticationError } from 'apollo-server-express'
import { User } from '../models'
import { sign, verify, JwtPayload } from "jsonwebtoken"

interface UserPayload extends JwtPayload {
  id: string;
}

export const signIn = async ({ email, password }: { email: string, password: string }) => {
  const message = 'Неверный email или пароль'

  const user = await User.findOne({ email: RegExp(email, 'i') })

  if (!user || !await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }

  return user
}


export const ensureSignedIn = (userId: string) => {
  if (!userId) {
    throw new AuthenticationError('Вы должны быть авторизованы')
  }
}

export const ensureSignedOut = (userId: string) => {
  if (userId) {
    throw new AuthenticationError('Вы уже авторизованы')
  }
}

const secret = process.env.SECRET_TOKEN || "secret"

export function validateAccessToken(token: string): UserPayload | null {
  try {
    return verify(token, secret) as UserPayload;
  } catch {
    return null;
  }
}

export const setTokens = (id: string) =>
  sign({ id }, secret, { expiresIn: '1d' })

export async function validateToken(accessToken: string): Promise<string | null> {
  const user = accessToken && validateAccessToken(accessToken)

  return user && user.id && await User.findById(user.id) ? user.id : null
}