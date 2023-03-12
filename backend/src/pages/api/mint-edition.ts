import { cors } from '@/middleware/cors'
import { rateLimit } from '@/middleware/rateLimit'
import { Keypair, PublicKey } from '@solana/web3.js'
import { NextApiHandler } from 'next'
import { connection } from '@/core'
import { MaiusKeypair } from '@/program/program'
import {
  keypairIdentity,
  Metaplex,
  toBigNumber,
  toNftOriginalEdition,
  toOriginalEditionAccount,
} from '@metaplex-foundation/js'
import { getMaiusInfoRequest, GetResponse } from '@/api/getMaiusInfoRequest'

interface PostResponse {
  transaction: string
  message?: string
}

const nftAddress = 'Bk6oPtAXwAzRcXEsRbDtbeLv5g1GMz5zr7eGQpNw7uBC'

const post: NextApiHandler<PostResponse> = async (request, response) => {
  const applicantWallet = MaiusKeypair
  if (!request.body.account) {
    throw new Error('Missing account in body')
  }

  const userWallet = new PublicKey(request.body.account)
  const metaplex = new Metaplex(connection)
  metaplex.use(keypairIdentity(applicantWallet))

  const originalEditionAccount = await metaplex.rpc().getAccount(
    metaplex
      .nfts()
      .pdas()
      .masterEdition({
        mint: new PublicKey(nftAddress),
      }),
  )

  const originalEdition = toNftOriginalEdition(
    toOriginalEditionAccount(originalEditionAccount),
  )
  const originalSupply = originalEdition?.supply?.toNumber()

  if (!originalSupply) {
    throw new Error('Can not fetch current supply')
  }
  const transactionBuilder = await metaplex
    .nfts()
    .builders()
    .printNewEdition({
      originalSupply: toBigNumber(originalSupply),
      originalMint: new PublicKey(nftAddress),
      newOwner: userWallet,
    })
  const latestBlockhash = await connection.getLatestBlockhash()
  const tx = await transactionBuilder.toTransaction(latestBlockhash)
  // transactionBuilder.getSigners().forEach(signer => {
  //   tx.partialSign(signer)
  // })
  tx.feePayer = applicantWallet.publicKey
  tx.partialSign(applicantWallet)
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
    return getMaiusInfoRequest(request, response)
  }
  if (request.method === 'POST') {
    return post(request, response)
  }

  throw new Error(`Unexpected method ${request.method}`)
}

export default index
