import firebase from '@/config/firebase'
import { NextApiRequest, NextApiResponse } from 'next'

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
  const fcm_token = req?.query?.fcm_token
  const wallet = req?.query?.wallet
  const url = req?.query?.url
  const event_address = req?.query?.event_address

  try {
    const res = await firebase.messaging().sendMulticast({
      tokens: [fcm_token],
      data: {
        url: url,
        event_address: event_address,
        wallet: wallet,
      },
      notification: {
        title: 'You received a NFT request!',
        body: `From wallet: ${wallet}. Tap to mint this NFT.`,
        imageUrl: `https://${req.headers.host}/ms-icon-310x310.png`,
      },
    })
    console.log(res?.responses)
  } catch (e) {
    console.log(e)
  }
  return res.status(200).json({})
}
