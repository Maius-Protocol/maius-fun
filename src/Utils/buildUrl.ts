import { Config } from '@/Config'
import queryString from 'query-string'
import { encodeURL } from '@solana/pay'
export const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`

export const buildSolanaPayUrl = (event_address: string, params: any) => {
  const baseUrl = encodeURIComponent(
    `${Config.API_URL}/mint?event_address=${event_address}`,
  )

  return `solana:${baseUrl?.toString()}${encodeURIComponent(
    queryString.stringify({
      ...params,
    }),
  )}`
}
