import S3 from 'aws-sdk/clients/s3'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { v4 } from 'uuid'
import { FormidableError, parseForm } from '@/lib/parse-form'
import uploadToStorage from '@/lib/upload-to-storage'

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

  let background: formidable.File | undefined
  let front: formidable.File | undefined

  try {
    const { files } = await parseForm(req)
    // @ts-ignore
    background = files?.background
    // @ts-ignore
    front = files?.front

    const { uploadImageCdnUrl, uploadJsonCdnUrl } = await uploadToStorage(
      background!,
      {
        name: 'Event',
        attributes: [{ trait_type: 'team', value: 'Maius' }],
      },
    )

    return res.status(200).json({
      data: { uploadImageCdnUrl, uploadJsonCdnUrl },
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
