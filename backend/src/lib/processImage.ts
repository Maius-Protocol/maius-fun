// @ts-ignore
import Constants from '@/config/constants'
import { v4 } from 'uuid'
import fs from 'fs'

const sharp = require('sharp')

const tmpFolder = process.env.NODE_ENV === 'production' ? '/tmp' : 'public/tmp'

const processImage = async (front: string, background: string) => {
  try {
    const key = v4()
    const resizedBackgroundName = `${tmpFolder}/resized_background_${key}`
    const resizedForegroundName = `${tmpFolder}/resized_foreground_${key}`
    const finalImageName = `${tmpFolder}/${key}.jpeg`
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
