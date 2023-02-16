import S3 from 'aws-sdk/clients/s3'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
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
  const bucket = process.env.BUCKET || "maius"
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
    return res.status(400).json({"error": errorParseFile.message})
  }

  const file = files.filename as any
  let fileStream = fs.createReadStream(file.filepath);
  let fileId = v4()
  let key = folderS3 + "/" + fileId
  let typeImage = file.mimetype


  const params: PutObjectRequest = {
    Bucket: bucket,
    Key: key,
    Body: fileStream,
    ContentType: typeImage,
  }

  await s3.upload(params, async function(err, res1) {
    if (err) {
      return res.status(400).json({"err": err})
    } else {
      let url = "https://" + bucket + "/" + key
      let nameJson = v4()
      let keyJson = folderS3 + "/" + nameJson + '.json'
      let type = "application/json"
      let data = {
        name: fields.name,
        image: url,
        attributes: [{trait_type:"team",value:"Maius"}],
        properties:
            {
              files: [{
                uri: url,
                type: typeImage
              }]
            }
      }
      const paramsJson: PutObjectRequest = {
        Bucket: bucket,
        Key: keyJson,
        Body: JSON.stringify(data),
        ContentType: type,
      }

      await s3.upload(paramsJson, async function(err, res2) {
        if (err) {
          return res.status(400).json({"err": err})
        } else {
          let urlJson = "https://" + bucket + "/" + keyJson
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
      maxFileSize: 1024 * 1024 * 5, // 5mb
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

