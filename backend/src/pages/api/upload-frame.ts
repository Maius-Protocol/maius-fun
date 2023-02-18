import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { FormidableError, parseForm } from '@/lib/parse-form'
import fs from 'fs'
import { bucket, folderS3, s3 } from '@/config/s3'
import { v4 } from 'uuid'
import mime from 'mime'
import { ConvertS3UrlToCDN } from '@/config/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({
      data: undefined,
      error: 'Method Not Allowed',
    })
    return
  }

  let frame: formidable.File | undefined

  try {
    const { files } = await parseForm(req)
    // @ts-ignore
    frame = files?.frame
    const fileStream = fs.createReadStream(frame?.filepath!)
    const mimetype = frame?.mimetype
    const fileName = `${folderS3}/frames/${v4()}`
    const fileExtension = mime.getExtension(mimetype!)
    const uploadImageResponse = await s3
      .upload({
        Bucket: bucket!,
        Key: `${fileName}${fileExtension ? '.' + fileExtension : ''}`,
        Body: fileStream,
        ContentType: mimetype!,
      })
      .promise()
    const url = ConvertS3UrlToCDN(uploadImageResponse.Key)

    return res.status(200).json({
      data: { url },
      error: null,
    })
  } catch (e) {
    if (e?.toString() !== '') {
      return res.status(500).json({ data: undefined, error: e })
    }
    if (e instanceof FormidableError) {
      return res
        .status(e.httpCode || 400)
        .json({ data: undefined, error: e.message })
    }
    return res
      .status(500)
      .json({ data: undefined, error: 'Internal Server Error' })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
