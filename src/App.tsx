import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import { Provider as AntdProvider } from '@ant-design/react-native'
import './Translations'
import enUS from '@ant-design/react-native/lib/locale-provider/en_US'
import { Colors } from '@/Theme/Variables'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <AntdProvider
        locale={enUS}
        theme={{
          primary_button_fill: Colors.gray,
          primary_button_fill_tap: 'black',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ApplicationNavigator />
        </QueryClientProvider>
      </AntdProvider>
    </PersistGate>
  </Provider>
)

export default App
