import { NextApiHandler } from 'next'
import Constants from '@/config/constants'

export interface GetResponse {
  label: string
  icon: string
}

export const get: NextApiHandler<GetResponse> = async (request, response) => {
  const label = `${Constants.APP_NAME}: Mint NFT 📸`
  const icon = `https://${request.headers.host}/ms-icon-310x310.png`

  response.status(200).send({
    label,
    icon,
  })
}
