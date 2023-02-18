import * as fs from 'fs'
import formidable from 'formidable'
import { v4 } from 'uuid'
import { bucket, folderS3, s3 } from '@/config/s3'
import { ConvertS3UrlToCDN } from '@/config/constants'

interface IUploadToStorageResponse {
  uploadImageCdnUrl: string
  uploadJsonCdnUrl: string
}

const uploadToStorage = async (
  file: formidable.File,
  params?: any,
): Promise<IUploadToStorageResponse> => {
  // @ts-ignore
  const fileStream = fs.createReadStream(file.filepath)
  const fileName = `${folderS3}/${v4()}`
  const mimetype = file.mimetype
  try {
    const uploadImageResponse = await s3
      .upload({
        Bucket: bucket!,
        Key: fileName,
        Body: fileStream,
        ContentType: file.mimetype!,
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
