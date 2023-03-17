import { Cluster } from '@solana/web3.js'
import EnvConfig from 'react-native-config'
import { Platform } from 'react-native'
const pkg = require('../../package.json')

// const isDev = process.env.NODE_ENV === 'development'
const isDev = false

const DevConfig = {
  API_URL: 'http://192.168.1.180:3000/api',
  SOLANA_CLUSTER: 'devnet' as Cluster,
  MOCKING_ENABLED: false,
  MOCKED_CONNECTION: {},
}
const ProductionConfig = {
  API_URL: 'https://maius.fun/api',
  SOLANA_CLUSTER: 'mainnet-beta' as Cluster,
  MOCKING_ENABLED: false,
  MOCKED_DEEPLINK: {},
}

export const Config = {
  ...(isDev ? DevConfig : ProductionConfig),
  IOS_APP_SCHEME: 'maiusfun',
  APP_URL: 'https://maius.fun',
  FEE_PER_NFT: 0.02,
  NEARBY_MESSAGES_API_KEY: EnvConfig.NEARBY_MESSAGES_API_KEY,
  APP_NAME: 'Maius Fun',
  IS_ANDROID: Platform.OS === 'android',
  MAXIMUM_IMAGE_RES: 2000,
  VERSION: pkg.version,
}

export const ApiRoutes = {
  UPLOAD_IMAGE: '/upload',
  UPLOAD_FRAME: '/upload-frame',
  SEND_NOTIFY: '/notify',
  NFTS: '/nfts',
}
