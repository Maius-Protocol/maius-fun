import { Config } from '@/Config'

export const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`

export const buildSolanaPayUrl = (params: any) => {
  const url = new URL(`solana:${Config.API_URL}/mint`)
  // url.search = params.toString()
  return url.toString()
}
