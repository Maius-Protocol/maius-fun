import Config from 'react-native-config'

type Envs = {
  NODE_ENV: 'development' | 'production' | 'staging'
  NEARBY_MESSAGES_API_KEY: string
}

export default Config as unknown as Envs
