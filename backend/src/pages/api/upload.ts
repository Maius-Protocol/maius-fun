import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { v4 } from 'uuid'
import * as fs from 'fs'
import { bucket, folderS3, region, s3 } from '@/config/s3'
import { FormidableError, parseForm } from '@/lib/parse-form'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    })
    return
  }

  try {
    const { fields, files } = await parseForm(req)

    const file = files.media
    console.log(fields, files)
    let url = files.filename.filepath

    res.status(200).json({
      data: {
        url,
      },
      error: null,
    })
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message })
    } else {
      console.error(e)
      res.status(500).json({ data: null, error: 'Internal Server Error' })
    }
  }

  res.status(200).json({
    data: {
      url: '/uploaded-file-url',
    },
    error: null,
  })
  //
  // const { errorParseFile, fields, files } = await parseForm(req)
  // console.log(errorParseFile, fields, files)
  // if (errorParseFile) {
  //   return res.status(400).json({ error: errorParseFile })
  // }
  //
  // let fileStream = fs.createReadStream(files.filename.filepath)
  // let fileId = v4()
  // let key = folderS3 + '/' + fileId
  // let type = files.filename.mimetype
  //
  // console.log(fileStream, fileId, key, type)
  // res.status(200).json({ message: 200 })

  // await s3.upload({
  //   Bucket: bucket!,
  //   Key: key,
  //   Body: fileStream,
  //   ContentType: type,
  //   Expires: new Date(),
  // })
  //
  // await s3.upload(params, async function (err, res1) {
  //   if (err) {
  //     return res.status(400).json({ err: err })
  //   } else {
  //     let url =
  //       'https://' + bucket + '.' + 's3-' + region + '.amazonaws.com/' + key
  //     let nameJson = v4()
  //     let keyJson = folderS3 + '/' + nameJson + '.json'
  //     let type = 'application/json'
  //     let data = {
  //       name: fields.name,
  //       image: url,
  //     }
  //     const paramsJson = {
  //       Bucket: bucket,
  //       Key: keyJson,
  //       Body: JSON.stringify(data),
  //       ContentType: type,
  //       Expires: 600,
  //     }
  //
  //     await s3.upload(paramsJson, async function (err, res2) {
  //       if (err) {
  //         return res.status(400).json({ err: err })
  //       } else {
  //         let urlJson =
  //           'https://' +
  //           bucket +
  //           '.' +
  //           's3-' +
  //           region +
  //           '.amazonaws.com/' +
  //           keyJson
  //         return res.status(200).json({ url: urlJson })
  //       }
  //     })
  //   }
  // })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
