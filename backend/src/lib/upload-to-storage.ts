import * as fs from 'fs'
import { bucket, s3 } from '@/config/s3'
import { ConvertS3UrlToCDN } from '@/config/constants'
import mime from 'mime'

const mimetype = 'image/jpeg'

export const uploadImageToStorage = async (
  fileName: string,
  file: string,
): Promise<string> => {
  // @ts-ignore
  const fileStream = fs.createReadStream(file)
  const fileExtension = mime.getExtension(mimetype)
  try {
    const uploadImageResponse = await s3
      .upload({
        Bucket: bucket!,
        Key: `${fileName}${fileExtension ? '.' + fileExtension : ''}`,
        Body: fileStream,
        ContentType: mimetype,
      })
      .promise()
    const uploadImageCdnUrl = ConvertS3UrlToCDN(uploadImageResponse.Key)

    return uploadImageCdnUrl
  } catch (e) {
    throw Error('Can not upload this photo to cloud provider')
  }
}

export const uploadJsonToStorage = async (
  fileName: string,
  uploadImageCdnUrl: string,
  params: any,
) => {
  const uploadJsonResponse = await s3
    .upload({
      Bucket: bucket!,
      Key: `${fileName}.json`,
      Body: JSON.stringify({
        ...params,
        image: uploadImageCdnUrl,
        properties: {
          files: [
            {
              uri: uploadImageCdnUrl,
              type: mimetype,
            },
          ],
        },
      }),
      ContentType: 'application/json',
    })
    .promise()

  const uploadJsonCdnUrl = ConvertS3UrlToCDN(uploadJsonResponse.Key)

  return uploadJsonCdnUrl
}
