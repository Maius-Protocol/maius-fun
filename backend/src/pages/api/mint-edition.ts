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
  KeypairSigner,
} from '@metaplex-foundation/js'
import { getMaiusInfoRequest, GetResponse } from '@/api/getMaiusInfoRequest'
import { toNumber } from 'web3-utils'

interface PostResponse {
  transaction: string
  message?: string
}

const nftAddress = 'ANXvfMwQfexUUM95V6YRXrerdFdmGVCA1WuCmLY1Auoe'

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
  let originalSupply = originalEdition?.supply?.toNumber()

  if (!originalSupply) {
    originalSupply = toNumber(0)
  }

  const newMint = Keypair.generate()

  const transactionBuilder = await metaplex
    .nfts()
    .builders()
    .printNewEdition({
      originalSupply: toBigNumber(originalSupply),
      newMint: newMint,
      originalMint: new PublicKey(nftAddress),
      newOwner: userWallet,
    })

  const latestBlockhash = await connection.getLatestBlockhash()

  const transaction = await transactionBuilder.toTransaction(latestBlockhash)

  const signer = transactionBuilder
    .getSigners()
    .map(value => value as KeypairSigner)
  const signerPublicKey = signer.map(value => value.publicKey)
  let signerPublicKeyUnique = []
  let flags = []
  for (let i = 0; i < signerPublicKey.length; i++) {
    if (flags[signerPublicKey[i].toString() as any]) {
      continue
    }
    flags[signerPublicKey[i].toString() as any] = true
    signerPublicKeyUnique.push(signerPublicKey[i])
  }
  transaction.feePayer = applicantWallet.publicKey
  transaction.setSigners(...signerPublicKeyUnique, userWallet)
  transaction.partialSign(...signer)

  // Serialize the transaction and convert to base64 to return it
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false, // account is a missing signature
  })
  const base64 = serializedTransaction.toString('base64')

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
