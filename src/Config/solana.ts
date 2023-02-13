import { clusterApiUrl } from '@solana/web3.js'
import { Config } from '@/Config/index'

export const NETWORK = clusterApiUrl(Config.SOLANA_CLUSTER)
