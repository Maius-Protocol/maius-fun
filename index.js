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
import * as Sentry from '@sentry/react-native'

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: 'https://cdbb8b5c254840a584b1d67dacd6f333@o4504016049668096.ingest.sentry.io/4504718638710784',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
})
AppRegistry.registerComponent(appName, () => Sentry.wrap(App))
