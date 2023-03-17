import { NextApiHandler } from 'next'
import { GetResponse } from '@/api/getMaiusInfoRequest'
import { cors, rateLimit } from '@/middleware'
import { Metaplex } from '@metaplex-foundation/js'
import { PublicKey } from '@solana/web3.js'
import { connection } from '@/core'

export const getAllNFTs: NextApiHandler<any> = async (request, response) => {
  const wallet = request.query.wallet
  if (!wallet) {
    throw new Error('missing wallet')
  }
  const metaplex = new Metaplex(connection)
  let nfts = await metaplex.nfts().findAllByOwner({
    owner: new PublicKey(wallet!),
  })

  nfts = nfts?.filter(nft => nft.symbol === 'MFUN' || nft.symbol === 'MAIRDROP')

  return response.status(200).send({
    data: nfts,
  })
}

const index: NextApiHandler<GetResponse> = async (request, response) => {
  await cors(request, response)
  await rateLimit(request, response)

  if (request.method === 'GET') {
    return getAllNFTs(request, response)
  }
  throw new Error(`Unexpected method ${request.method}`)
}

export default index
