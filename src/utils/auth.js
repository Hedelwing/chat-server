import { AuthenticationError } from 'apollo-server-express'
import { User } from '../models'
import { sign, verify } from "jsonwebtoken"

export const signIn = async ({ email, password }) => {
  const message = 'Неверный email или пароль'

  const user = await User.findOne({ email })

  if (!user || !await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }

  return user
}


export const ensureSignedIn = user => {
  if (!user) {
    throw new AuthenticationError('Вы должны быть авторизованы')
  }
}

export const ensureSignedOut = user => {
  if (user) {
    throw new AuthenticationError('Вы уже авторизованы')
  }
}

const secret = process.env.SECRET_TOKEN || "secret"

export function validateAccessToken(token) {
  try {
    return verify(token, secret);
  } catch {
    return null;
  }
}

export const setTokens = ({ id }) =>
  sign({ id }, secret, { expiresIn: '1d' })

export async function validateToken(accessToken) {
  const userId = accessToken && validateAccessToken(accessToken)?.id

  return userId && await User.findById(userId) ? userId : null
}