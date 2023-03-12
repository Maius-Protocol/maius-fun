import { cors } from '@/middleware/cors'
import { rateLimit } from '@/middleware/rateLimit'
import { PublicKey } from '@solana/web3.js'
import { NextApiHandler } from 'next'
import { connection } from '@/core'
import { MaiusKeypair } from '@/program/program'
import { keypairIdentity, Metaplex, toBigNumber } from '@metaplex-foundation/js'
import { get, GetResponse } from '@/lib/get-response'

interface PostResponse {
  transaction: string
  message?: string
}

const post: NextApiHandler<PostResponse> = async (request, response) => {
  const applicantWallet = MaiusKeypair
  const originalSupply = 300

  const nftAddress = 'Bk6oPtAXwAzRcXEsRbDtbeLv5g1GMz5zr7eGQpNw7uBC'

  const metaplex = new Metaplex(connection)
  metaplex.use(keypairIdentity(applicantWallet))

  const transactionBuilder = await metaplex
    .nfts()
    .builders()
    .printNewEdition({
      originalSupply: toBigNumber(originalSupply),
      originalMint: new PublicKey(nftAddress),
      // newOwner: new PublicKey(request.body.account),
    })

  console.log(request.body.account)

  const latestBlockhash = await connection.getLatestBlockhash()
  const tx = await transactionBuilder.toTransaction(latestBlockhash)

  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  // tx.feePayer = applicantWallet.publicKey
  // tx.partialSign(applicantWallet)
  // tx.partialSign(mint1)
  const serialized = tx.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  })
  const base64 = serialized.toString('base64')

  const message = 'Powered by Maius Fun'
  // Return the serialized transaction
  return response.status(200).send({ transaction: base64, message })
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
