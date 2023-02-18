import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    return res
      .status(200)
      .json({ label: 'Michael Vines', icon: 'https://example.com/icon.svg' })
  }
  if (req.method === 'POST') {
  }

  res.status(200).json({})
}
