import { Cluster } from '@solana/web3.js'

const isDev = process.env.NODE_ENV === 'development'

const DevConfig = {
  API_URL: 'https://e461-113-22-33-112.ap.ngrok.io/api',
  SOLANA_CLUSTER: 'devnet' as Cluster,
  MOCKING_ENABLED: false,
  MOCKED_CONNECTION: {},
}
const ProductionConfig = {
  API_URL: 'https://airdrop.maiuspay.com/api',
  SOLANA_CLUSTER: 'mainnet-beta' as Cluster,
  MOCKING_ENABLED: false,
  MOCKED_DEEPLINK: {},
}

export const Config = {
  ...(isDev ? DevConfig : ProductionConfig),
  IOS_APP_SCHEME: 'mairdrop',
}

export const ApiRoutes = {
  UPLOAD_IMAGE: '/upload',
  UPLOAD_FRAME: '/upload-frame',
}
