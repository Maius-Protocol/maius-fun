import S3 from 'aws-sdk/clients/s3'

const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_KEY
const bucket = process.env.BUCKET
const region = process.env.REGION
const folderS3 = process.env.FOLDER_S3

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  signatureVersion: 'v4',
})

export { accessKeyId, secretAccessKey, bucket, region, folderS3, s3 }
