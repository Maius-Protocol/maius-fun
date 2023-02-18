import type { NextApiRequest } from 'next'
import formidable from 'formidable'

export const FormidableError = formidable.errors.FormidableError

export const parseForm = async (
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024 * 100,
      filter: part => {
        return (
          (part.name === 'background' ||
            part.name === 'front' ||
            part.name === 'frame') &&
          (part.mimetype?.includes('image') || false)
        )
      },
    })

    form.parse(req, function (err, fields, files) {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}
