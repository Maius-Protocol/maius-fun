/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { Amplify } from 'aws-amplify'
import { Buffer } from 'buffer'
import awsconfig from './src/aws-exports'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'

Amplify.configure(awsconfig)
global.Buffer = global.Buffer || Buffer
import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
