import { Cluster } from '@solana/web3.js'
import EnvConfig from 'react-native-config'

const isDev = false

const DevConfig = {
  API_URL: 'https://02fb-115-79-204-39.ap.ngrok.io/api',
  SOLANA_CLUSTER: 'devnet' as Cluster,
  MOCKING_ENABLED: false,
  MOCKED_CONNECTION: {},
}
const ProductionConfig = {
  API_URL: 'https://maius.fun/api',
  SOLANA_CLUSTER: 'devnet' as Cluster,
  MOCKING_ENABLED: false,
  MOCKED_DEEPLINK: {},
}

export const Config = {
  ...(isDev ? DevConfig : ProductionConfig),
  IOS_APP_SCHEME: 'mairdrop',
  APP_URL: 'https://maius.fun',
  FEE_PER_NFT: 0.02,
  NEARBY_MESSAGES_API_KEY: EnvConfig.NEARBY_MESSAGES_API_KEY,
  APP_NAME: 'Maius Fun',
}

export const ApiRoutes = {
  UPLOAD_IMAGE: '/upload',
  UPLOAD_FRAME: '/upload-frame',
  SEND_NOTIFY: '/notify',
}
