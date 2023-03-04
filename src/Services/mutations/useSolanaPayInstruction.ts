import { useMutation } from 'react-query'
import queryString from 'query-string'
import { baseUrl } from '@/Utils/buildUrl'
import { axiosInstance } from '@/Config/axios'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { AxiosResponse } from 'axios'

interface useSolanaPayInstructionResponse {
  transaction: string
  message: string
}

function useSolanaPayInstruction() {
  const _walletPublickey = useSelector(walletPublicKey)

  return useMutation(async ({ url }: any) => {
    const _base = baseUrl?.toString()
    const parsedParams = queryString.parse(
      decodeURIComponent(url?.replace(`solana:${_base}`, '')),
    )
    const { data } = await axiosInstance.post<
      any,
      AxiosResponse<useSolanaPayInstructionResponse>
    >(
      decodeURIComponent(_base),
      {
        account: _walletPublickey,
      },
      {
        params: parsedParams,
      },
    )

    return data.transaction
  })
}

export default useSolanaPayInstruction
