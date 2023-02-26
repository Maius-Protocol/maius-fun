import { cors } from '@/middleware/cors'
import { rateLimit } from '@/middleware/rateLimit'
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { NextApiHandler } from 'next'
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
import { MaiusKeypair } from '@/program/program'
import { getEventAccount } from '@/program/getEventAccount'
import { getTransferFeeInstructions } from '@/program/getTransferFeeInstruction'
import Constants from '@/config/constants'

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
  const event_address = request.query.event_address
  if (!event_address) {
    throw new Error('missing event_address')
  }

  const eventAccount = await getEventAccount(event_address as string)
  console.log('debug', eventAccount?.name?.toString() || 'Maius Airdrop')
  const applicantWallet = MaiusKeypair

  let mint = Keypair.generate()
  let mint1 = {
    publicKey: new PublicKey(request.body.account),
  }
  // let mint1 = Keypair.generate()

  let ata = await getAssociatedTokenAddress(mint.publicKey, mint1.publicKey)

  let tokenMetadataPubkey = await getMetadataPDA(mint.publicKey)

  let masterEditionPubkey = await getMasterEditionPDA(mint.publicKey)

  let transferFeeInstructions = await getTransferFeeInstructions(
    // @ts-ignore
    eventAccount?.executor as PublicKey,
    new PublicKey(event_address as string),
    eventAccount?.vault as PublicKey,
  )

  let tx = new Transaction().add(
    transferFeeInstructions,
    SystemProgram.createAccount({
      fromPubkey: applicantWallet.publicKey,
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
      applicantWallet.publicKey,
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
        payer: applicantWallet.publicKey,
        updateAuthority: applicantWallet.publicKey,
      },
      {
        createMetadataAccountArgsV2: {
          data: {
            name: eventAccount?.name?.toString() || 'Maius Fun',
            symbol: 'MFUN',
            uri: json as string,
            sellerFeeBasisPoints: 100,
            creators: [
              {
                address: new PublicKey(
                  (typeof eventAccount?.host === 'string'
                    ? eventAccount?.host
                    : eventAccount?.host?.toBase58()) as string,
                ),
                verified: true,
                share: 100,
              },
              {
                address: new PublicKey(event_address as string),
                verified: false,
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
    createCreateMasterEditionV3Instruction(
      {
        edition: masterEditionPubkey,
        mint: mint.publicKey,
        updateAuthority: applicantWallet.publicKey,
        mintAuthority: applicantWallet.publicKey,
        payer: applicantWallet.publicKey,
        metadata: tokenMetadataPubkey,
      },
      {
        createMasterEditionArgs: {
          maxSupply: 0,
        },
      },
    ),
  )

  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  tx.feePayer = applicantWallet.publicKey
  tx.setSigners(applicantWallet.publicKey, mint.publicKey, mint1.publicKey)
  tx.partialSign(mint)
  tx.partialSign(applicantWallet)
  // tx.partialSign(mint1)
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
