import * as fs from 'fs'
import { v4 } from 'uuid'
import { bucket, folderS3, s3 } from '@/config/s3'
import { ConvertS3UrlToCDN } from '@/config/constants'
import mime from 'mime'

interface IUploadToStorageResponse {
  uploadImageCdnUrl: string
  uploadJsonCdnUrl: string
}

const uploadToStorage = async (
  file: string,
  params?: any,
): Promise<IUploadToStorageResponse> => {
  if (process.env.NODE_ENV === 'development') {
    return {
      uploadImageCdnUrl: ConvertS3UrlToCDN(file),
      uploadJsonCdnUrl: ConvertS3UrlToCDN(file),
    }
  }

  // @ts-ignore
  const fileStream = fs.createReadStream(file)
  const mimetype = 'image/jpeg'
  const fileName = `${folderS3}/${v4()}`
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
    return {
      uploadImageCdnUrl,
      uploadJsonCdnUrl,
    }
  } catch (e) {
    throw Error('Can not upload this photo to cloud provider')
  }
}

export default uploadToStorage
