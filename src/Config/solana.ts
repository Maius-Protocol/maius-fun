import { clusterApiUrl } from '@solana/web3.js'
import { Config, isDev } from '@/Config/index'

export const NETWORK = isDev
  ? clusterApiUrl(Config.SOLANA_CLUSTER)
  : 'https://solana-mainnet.rpc.extrnode.com'
