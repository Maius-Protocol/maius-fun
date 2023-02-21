/**
 * @format
 */

import './shim.js'
import { AppRegistry } from 'react-native'
import { Buffer } from 'buffer'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'
import { AnchorProvider, setProvider } from '@project-serum/anchor'

setProvider(AnchorProvider.defaultOptions())
global.Buffer = global.Buffer || Buffer
import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
