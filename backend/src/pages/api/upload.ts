import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { v4 } from "uuid";
import * as fs from "fs";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const accessKeyId = process.env.ACCESS_KEY
  const secretAccessKey = process.env.SECRET_KEY
  const bucket = process.env.BUCKET
  const region = process.env.REGION
  const folderS3 = process.env.FOLDER_S3

  const s3 = new S3({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    signatureVersion: "v4",
  })

  const {errorParseFile, fields, files } = await parseForm(req);
  if (errorParseFile) {
    return res.status(400).json({"error": errorParseFile})
  }

  let fileStream = fs.createReadStream(files.filename.filepath);
  let fileId = v4()
  let key = folderS3 + "/" + fileId
  let type = files.filename.mimetype

  const params = {
    Bucket: bucket,
    Key: key,
    Body: fileStream,
    ContentType: type,
    Expires: 600
  }

  await s3.upload(params, async function(err, res1) {
    if (err) {
      return res.status(400).json({"err": err})
    } else {
      let url = "https://" + bucket + "." + "s3-" + region + ".amazonaws.com/" + key
      let nameJson = v4()
      let keyJson = folderS3 + "/" + nameJson + '.json'
      let type = "application/json"
      let data = {
        name: fields.name,
        image: url
      }
      const paramsJson = {
        Bucket: bucket,
        Key: keyJson,
        Body: JSON.stringify(data),
        ContentType: type,
        Expires: 600
      }

      await s3.upload(paramsJson, async function(err, res2) {
        if (err) {
          return res.status(400).json({"err": err})
        } else {
          let urlJson = "https://" + bucket + "." + "s3-" + region + ".amazonaws.com/" + keyJson
          return res.status(200).json({"url": urlJson})
        }
      })
    }
  });

}

export const parseForm = async (
    req: NextApiRequest
): Promise<{errorParseFile: Error, fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024, // 1mb
    });
    form.parse(req, function (errorParseFile, fields, files) {
      if (errorParseFile) resolve({errorParseFile, fields, files});
      else resolve({errorParseFile, fields, files });
    });
  });
};


export const config = {
  api: {
    bodyParser: false,
  },
};

