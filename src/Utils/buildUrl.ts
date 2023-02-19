import { Config } from '@/Config'
import queryString from 'query-string'
import { encodeURL } from '@solana/pay'
export const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`

export const buildSolanaPayUrl = (params: any) => {
  const baseUrl = encodeURIComponent(`${Config.API_URL}/mint?`)

  return `solana:${baseUrl?.toString()}${encodeURIComponent(
    queryString.stringify({
      ...params,
    }),
  )}`
}
