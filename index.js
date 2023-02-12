/**
 * @format
 */

import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'
import { Buffer } from 'buffer'
global.Buffer = global.Buffer || Buffer
import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
