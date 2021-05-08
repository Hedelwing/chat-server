import { createWriteStream } from "fs"
import { join } from "path"
import { rootDir } from '../config'

export default {
    Mutation: {
        uploadFile: async (_, { file }, { req }) => {
            const { createReadStream } = await file
            const filename = req.session.userId

            await new Promise(res =>
                createReadStream()
                    .pipe(createWriteStream(join(rootDir, "../images", filename)))
                    .on("close", res)
            )

            return true
        }
    }
}