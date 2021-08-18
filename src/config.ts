export const {
    PORT = 3003,
    DB_USER = "hedelwing",
    DB_PASS = "dafno4ka",
    DB_HOST = "cluster-mzc7p.azure.mongodb.net",
    DB_NAME = "chat",
    FRONT_URI = process.env.NODE_ENV === "production" ? "https://hedelwing-chat.herokuapp.com" : "http://localhost:8080"
} = process.env

export const rootDir = __dirname