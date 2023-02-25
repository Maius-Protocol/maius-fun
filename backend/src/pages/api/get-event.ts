import { NextApiRequest, NextApiResponse } from 'next'
import { getEvent } from '@/core'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let event = await getEvent('CmFrcQVtrNDssNKZoUj1byegFtxBHn9thCuoXmBQUJHN')
    return res.status(200).json({
      data: { event },
      error: null,
    })
  } catch (e) {
    return res.status(500)
  }
}
