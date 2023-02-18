import { Cluster } from '@solana/web3.js'

const isDev = process.env.NODE_ENV === 'development'

const DevConfig = {
  API_URL: 'http://localhost:3000/api',
  SOLANA_CLUSTER: 'devnet' as Cluster,
  MOCKING_ENABLED: true,
}
const ProductionConfig = {
  API_URL: 'https://airdrop.maiuspay.com/api',
  SOLANA_CLUSTER: 'mainnet-beta' as Cluster,
  MOCKING_ENABLED: false,
}

export const Config = {
  ...(isDev ? DevConfig : ProductionConfig),
  IOS_APP_SCHEME: 'mairdrop',
}

export const ApiRoutes = {
  UPLOAD_IMAGE: '/upload',
  UPLOAD_FRAME: '/upload-frame',
}
