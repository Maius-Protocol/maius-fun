import { Cluster } from '@solana/web3.js'

const isDev = process.env.NODE_ENV === 'development'

const DevConfig = {
  API_URL: 'https://c1fd-42-115-114-173.ap.ngrok.io/api',
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
  APP_URL: 'https://airdrop.maiuspay.com',
  FEE_PER_NFT: 0.02,
}

export const ApiRoutes = {
  UPLOAD_IMAGE: '/upload',
  UPLOAD_FRAME: '/upload-frame',
}
