import { Cluster } from '@solana/web3.js'

export const Config = {
  // API_URL: 'https://airdrop.maiuspay.com/api',
  API_URL: 'http://172.20.10.2:3000/api',
  SOLANA_CLUSTER: 'devnet' as Cluster,
  IOS_APP_SCHEME: 'mairdrop',
  MOCKING_ENABLED: true,
}

export const ApiRoutes = {
  UPLOAD_IMAGE: '/upload',
}
