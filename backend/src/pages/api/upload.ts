import S3 from 'aws-sdk/clients/s3'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { v4 } from 'uuid'
import * as fs from 'fs'
import { FormidableError, parseForm } from '@/lib/parse-form'

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

  try {
    const { fields, files } = await parseForm(req)

    const background = files?.background
    const front = files?.front

    res.status(200).json({
      data: {
        background: background.filepath,
      },
      error: null,
    })
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: undefined, error: e.message })
    } else {
      console.error(e)
      res.status(500).json({ data: undefined, error: 'Internal Server Error' })
    }
  }

  res.status(200).json({
    data: {
      url: '/uploaded-file-url',
    },
    error: undefined,
  })
  // const {errorParseFile, fields, files } = await parseForm(req);
  // if (errorParseFile) {
  //   return res.status(400).json({"error": errorParseFile})
  // }
  //
  // const file = files.filename as any
  // let fileStream = fs.createReadStream(file.filepath);
  // let fileId = v4()
  // let key = folderS3 + "/" + fileId
  // let type = file.mimetype
  //
  //
  // const params: PutObjectRequest = {
  //   Bucket: bucket,
  //   Key: key,
  //   Body: fileStream,
  //   ContentType: type,
  // }
  //
  // await s3.upload(params, async function(err, res1) {
  //   if (err) {
  //     return res.status(400).json({"err": err})
  //   } else {
  //     let url = "https://" + bucket + "." + "s3-" + region + ".amazonaws.com/" + key
  //     let nameJson = v4()
  //     let keyJson = folderS3 + "/" + nameJson + '.json'
  //     let type = "application/json"
  //     let data = {
  //       name: fields.name,
  //       image: url
  //     }
  //     const paramsJson: PutObjectRequest = {
  //       Bucket: bucket,
  //       Key: keyJson,
  //       Body: JSON.stringify(data),
  //       ContentType: type,
  //     }
  //
  //     await s3.upload(paramsJson, async function(err, res2) {
  //       if (err) {
  //         return res.status(400).json({"err": err})
  //       } else {
  //         let urlJson = "https://" + bucket + "." + "s3-" + region + ".amazonaws.com/" + keyJson
  //         return res.status(200).json({"url": urlJson})
  //       }
  //     })
  //   }
  // });
}

export const config = {
  api: {
    bodyParser: false,
  },
}
