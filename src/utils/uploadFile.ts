import cloudinary, { UploadApiOptions, UploadApiResponse } from 'cloudinary'

cloudinary.v2.config({
    cloud_name: 'dlajqlyky',
    api_key: '478439327858342',
    api_secret: 'nEt1XseNpTuUTCORdlDYFfvCIoU'
})

const baseConfig: UploadApiOptions = {
    allowed_formats: ["png", "jpg", "webp"],
    format: "jpg",
}

const uploadImage = async (file: any, config?: UploadApiOptions) => {
    const { createReadStream } = await file

    const result: UploadApiResponse = await new Promise((res, rej) =>
        createReadStream()
            .pipe(cloudinary.v2.uploader.upload_stream(
                {
                    ...baseConfig,
                    ...config
                },
                (e, result) => {
                    if (!result) throw new Error("Не удалось загрузить изображение")

                    res(result)
                }
            ))
    )

    return result
}

export default uploadImage