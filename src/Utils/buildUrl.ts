export const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`

export const buildSolanaPayUrl = (path: string, params: URLSearchParams) => {
  const url = new URL(path, 'solana:')
  url.search = params.toString()
  return url.toString()
}
