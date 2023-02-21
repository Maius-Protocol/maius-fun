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
  const icon = `https://${request.headers.host}/next.svg`

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
  const recipientField = request.query.recipient
  if (!recipientField) {
    throw new Error('missing recipient')
  }
  if (typeof recipientField !== 'string') {
    throw new Error('invalid recipient')
  }
  const recipient = new PublicKey(recipientField)

  const amountField = request.query.amount
  if (!amountField) {
    throw new Error('missing amount')
  }
  if (typeof amountField !== 'string') {
    throw new Error('invalid amount')
  }
  const amount = new BigNumber(amountField)

  const splTokenField = request.query['spl-token']
  if (splTokenField && typeof splTokenField !== 'string') {
    throw new Error('invalid spl-token')
  }
  const splToken = splTokenField ? new PublicKey(splTokenField) : undefined

  const referenceField = request.query.reference
  if (!referenceField) {
    throw new Error('missing reference')
  }
  if (typeof referenceField !== 'string') {
    throw new Error('invalid reference')
  }
  const reference = new PublicKey(referenceField)

  const messageParam = request.query.message
  if (messageParam && typeof messageParam !== 'string') {
    throw new Error('invalid message')
  }
  const message = messageParam || undefined

  // Account provided in the transaction request body by the wallet.
  const accountField = request.body?.account
  if (!accountField) {
    throw new Error('missing account')
  }
  if (typeof accountField !== 'string') {
    throw new Error('invalid account')
  }
  const account = new PublicKey(accountField)

  // Compose a simple transfer transaction to return. In practice, this can be any transaction, and may be signed.
  let transaction = await createTransfer(connection, account, {
    recipient,
    amount,
    splToken,
    reference,
  })

  // Serialize and deserialize the transaction. This ensures consistent ordering of the account keys for signing.
  transaction = Transaction.from(
    transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    }),
  )

  // Serialize and return the unsigned transaction.
  const serialized = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  })
  const base64 = serialized.toString('base64')

  response.status(200).send({ transaction: base64, message })
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
