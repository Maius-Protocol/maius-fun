import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { FormidableError, parseForm } from '@/lib/parse-form'
import processImage from '@/lib/processImage'
import { getEventAccount } from '@/program/getEventAccount'
import { folderS3 } from '@/config/s3'
import { v4 } from 'uuid'
import {
  uploadImageToStorage,
  uploadJsonToStorage,
} from '@/lib/upload-to-storage'

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

  const event_address = req?.query?.event_address
  try {
    const { files } = await parseForm(req)
    // @ts-ignore
    background = files?.background
    // @ts-ignore
    front = files?.front
    // @ts-ignore
    const finalImage = await processImage(front.filepath, background.filepath)
    const eventAccount = await getEventAccount(event_address as string)

    const fileName = `${folderS3}/${v4()}`
    const uploadImageCdnUrl = await uploadImageToStorage(fileName, finalImage!)
    const uploadJsonCdnUrl = await uploadJsonToStorage(
      fileName,
      uploadImageCdnUrl,
      {
        // @ts-ignore
        name: eventAccount?.name?.toString(),
        // @ts-ignore
        description: eventAccount?.description?.toString(),
        attributes: [{ trait_type: 'Maius Fun', value: 'true' }],
        properties: {
          files: [
            {
              uri: uploadImageCdnUrl!,
              type: 'image/jpeg',
            },
          ],
          category: 'image',
        },
      },
    )
    console.log(uploadImageCdnUrl, uploadJsonCdnUrl)
    return res.status(200).json({
      data: { image: uploadImageCdnUrl, json: uploadJsonCdnUrl },
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
