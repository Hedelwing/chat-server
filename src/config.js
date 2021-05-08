import { config } from 'dotenv'
config()

export const {
    PORT,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
} = process.env

export const rootDir = __dirname