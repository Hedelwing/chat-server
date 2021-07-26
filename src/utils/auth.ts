import { AuthenticationError } from 'apollo-server-express'
import { User } from '../models'
import { sign, verify, JwtPayload } from "jsonwebtoken"

interface UserPayload extends JwtPayload {
  id: string;
}

export const signIn = async ({ email, password }) => {
  const message = 'Неверный email или пароль'

  const user = await User.findOne({ email })

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

export const setTokens = ({ id }: { id: string }) =>
  sign({ id }, secret, { expiresIn: '1d' })

export async function validateToken(accessToken: string): Promise<string | null> {
  const userId = accessToken && validateAccessToken(accessToken)?.id

  return userId && await User.findById(userId) ? userId : null
}