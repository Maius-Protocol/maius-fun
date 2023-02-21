import { connection } from '@/core/connection'
import { cors } from '@/middleware/cors'
import { rateLimit } from '@/middleware/rateLimit'
import { createTransfer } from '@solana/pay'
import { PublicKey, Transaction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { NextApiHandler } from 'next'

interface GetResponse {
  label: string
  icon: string
}

const get: NextApiHandler<GetResponse> = async (request, response) => {
  const label = 'Maius Airdrop: Mint NFT 🔥'
  const icon = `https://${request.headers.host}/maius_pay.png`

  response.status(200).send({
    label,
    icon,
  })
}

interface PostResponse {
  transaction: string
  message?: string
}

const post: NextApiHandler<PostResponse> = async (request, response) => {
  const image = request.query.image
  if (!image) {
    throw new Error('missing image')
  }
  const json = request.query.json
  if (!json) {
    throw new Error('missing json')
  }
  response.status(200).send({})
  // transaction = Transaction.from(
  //   transaction.serialize({
  //     verifySignatures: false,
  //     requireAllSignatures: false,
  //   }),
  // )
  //
  // // Serialize and return the unsigned transaction.
  // const serialized = transaction.serialize({
  //   verifySignatures: false,
  //   requireAllSignatures: false,
  // })
  // const base64 = serialized.toString('base64')
  //
  // response.status(200).send({ transaction: base64, message })
}

const index: NextApiHandler<GetResponse | PostResponse> = async (
  request,
  response,
) => {
  await cors(request, response)
  await rateLimit(request, response)

  if (request.method === 'GET') {
    return get(request, response)
  }
  if (request.method === 'POST') {
    return post(request, response)
  }

  throw new Error(`Unexpected method ${request.method}`)
}

export default index
