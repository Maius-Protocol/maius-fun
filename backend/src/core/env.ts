export const CLUSTER_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'https://api.devnet.solana.com'
    : 'https://solana-mainnet.rpc.extrnode.com/'
export const RATE_LIMIT = Number(process.env.RATE_LIMIT) || undefined
export const RATE_LIMIT_INTERVAL =
  Number(process.env.RATE_LIMIT_INTERVAL) || undefined
