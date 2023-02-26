// @ts-ignore
import Constants from '@/config/constants'
import { v4 } from 'uuid'
import fs from 'fs'

const sharp = require('sharp')

const processImage = async (front: string, background: string) => {
  try {
    if (!fs.existsSync('public/tmp')) {
      fs.mkdirSync('public/tmp')
    }
    const key = v4()
    const resizedBackgroundName = `public/tmp/resized_background_${key}`
    const resizedForegroundName = `public/tmp/resized_foreground_${key}`
    const finalImageName = `public/tmp/${key}.jpeg`
    await sharp(background)
      .resize({
        width: Constants.IMAGE_SIZE,
        height: Constants.IMAGE_SIZE,
      })
      .toFile(resizedBackgroundName)
    await sharp(front)
      .resize({
        width: Constants.IMAGE_SIZE,
        height: Constants.IMAGE_SIZE,
      })
      .toFile(resizedForegroundName)

    await sharp(resizedForegroundName)
      .composite([
        {
          input: resizedBackgroundName,
          top: 0,
          left: 0,
        },
      ])
      .toFormat('jpeg', { mozjpeg: true })
      .toFile(finalImageName)
    return finalImageName
  } catch (e) {
    console.log(e)
  }
}

export default processImage
