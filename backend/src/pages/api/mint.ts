import { cors } from '@/middleware/cors'
import { rateLimit } from '@/middleware/rateLimit'
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { NextApiHandler } from 'next'
const bs58 = require('bs58')
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { getMasterEditionPDA, getMetadataPDA } from '@/lib/metadata-utils'
import { connection } from '@/core'
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata'

interface GetResponse {
  label: string
  icon: string
}

const get: NextApiHandler<GetResponse> = async (request, response) => {
  const label = 'Maius Airdrop: Mint NFT 🔥'
  const icon = `https://${request.headers.host}/ms-icon-310x310.png`

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

  const applicantWallet = {
    publicKey: new PublicKey(request.body.account),
  }

  const maiusWallet = Keypair.fromSecretKey(
    bs58.decode(process.env.MAIUS_WALLET_PRIVATE_KEY),
  )

  let mint = Keypair.generate()
  console.log(`mint: ${mint.publicKey.toBase58()}`)
  let mint1 = Keypair.generate()
  console.log(`mint1: ${mint1.publicKey.toBase58()}`)

  let ata = await getAssociatedTokenAddress(mint.publicKey, mint1.publicKey)

  let tokenMetadataPubkey = await getMetadataPDA(mint.publicKey)

  let masterEditionPubkey = await getMasterEditionPDA(mint.publicKey)

  let tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: maiusWallet.publicKey,
      newAccountPubkey: mint.publicKey,
      lamports: await getMinimumBalanceForRentExemptMint(connection),
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint.publicKey,
      0,
      applicantWallet.publicKey,
      applicantWallet.publicKey,
    ),
    createAssociatedTokenAccountInstruction(
      maiusWallet.publicKey,
      ata,
      mint1.publicKey,
      mint.publicKey,
    ),
    createMintToCheckedInstruction(
      mint.publicKey,
      ata,
      applicantWallet.publicKey,
      1,
      0,
    ),
    createCreateMetadataAccountV2Instruction(
      {
        metadata: tokenMetadataPubkey,
        mint: mint.publicKey,
        mintAuthority: applicantWallet.publicKey,
        payer: maiusWallet.publicKey,
        updateAuthority: applicantWallet.publicKey,
      },
      {
        createMetadataAccountArgsV2: {
          data: {
            name: 'Test 123-',
            symbol: 'FSMB',
            uri: json as string,
            sellerFeeBasisPoints: 0,
            creators: [
              {
                address: applicantWallet.publicKey,
                verified: true,
                share: 0,
              },
            ],
            collection: null,
            uses: null,
          },
          isMutable: true,
        },
      },
    ),
    // createCreateMasterEditionV3Instruction(
    //   {
    //     edition: masterEditionPubkey,
    //     mint: mint.publicKey,
    //     updateAuthority: applicantWallet.publicKey,
    //     mintAuthority: applicantWallet.publicKey,
    //     payer: maiusWallet.publicKey,
    //     metadata: tokenMetadataPubkey,
    //   },
    //   {
    //     createMasterEditionArgs: {
    //       maxSupply: 0,
    //     },
    //   },
    // ),
  )
  tx.recentBlockhash = (
    await connection.getLatestBlockhash('confirmed')
  ).blockhash
  tx.feePayer = maiusWallet.publicKey
  tx.partialSign(maiusWallet)
  const serialized = tx.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  })
  const base64 = serialized.toString('base64')
  response.status(200).send({ transaction: base64, message: '' })
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
