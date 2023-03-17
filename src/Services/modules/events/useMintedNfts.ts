import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { useQuery } from 'react-query'
import { axiosInstance } from '@/Config/axios'
import { ApiRoutes } from '@/Config'
import { AxiosResponse } from 'axios'

export interface INftsResponse {
  data: Daum[]
}

export interface Daum {
  model: string
  address: string
  mintAddress: string
  updateAuthorityAddress: string
  json: any
  jsonLoaded: boolean
  name: string
  symbol: string
  uri: string
  isMutable: boolean
  primarySaleHappened: boolean
  sellerFeeBasisPoints: number
  editionNonce: number
  creators: Creator[]
  tokenStandard: number
  collection?: Collection
  collectionDetails: any
  uses: any
  programmableConfig: any
}

export interface Creator {
  address: string
  verified: boolean
  share: number
}

export interface Collection {
  verified: boolean
  key: string
  address: string
}

export function useJsonContent(jsonUrl: string) {
  return useQuery<AxiosResponse<any>>(['json', jsonUrl], async () => {
    return await axiosInstance.get(jsonUrl, {})
  })
}

function useMintedNfts() {
  const wallet = useSelector(walletPublicKey)

  return useQuery<AxiosResponse<INftsResponse>>(['nfts', wallet], async () => {
    return await axiosInstance.get(ApiRoutes.NFTS, {
      params: {
        wallet: wallet!,
      },
    })
  })
}

export default useMintedNfts
