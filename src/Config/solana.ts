import { clusterApiUrl } from '@solana/web3.js'
import { Config } from '@/Config/index'

export const NETWORK =
  process.env.NODE_ENV === 'development'
    ? clusterApiUrl(Config.SOLANA_CLUSTER)
    : 'https://solana-mainnet.rpc.extrnode.com'
