import React from 'react'
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { AppRoutes, navigationRef } from './utils'
import analytics from '@react-native-firebase/analytics'
import ChooseFrameContainer from '@/Containers/ChooseFrame/ChooseFrameContainer'
import CapturePhotoContainer from '@/Containers/CapturePhoto/CapturePhotoContainer'
import MintNFTContainer from '@/Containers/MintNFT/MintNFTContainer'
import WalletProvider from '@/Hooks/useWallet'
import ConnectWalletContainer from '@/Containers/ConnectWallet/ConnectWalletContainer'
import { useDispatch, useSelector } from 'react-redux'
import { updateWalletPublicKey, walletPublicKey } from '@/Store/Wallet'
import RNRestart from 'react-native-restart'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const routeNameRef = React.useRef()
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const wallet = useSelector(walletPublicKey)
  const dispatch = useDispatch()

  return (
    <WalletProvider>
      <SafeAreaView
        style={[Layout.fill, { backgroundColor: colors.background }]}
      >
        {wallet && (
          <TouchableOpacity
            onPress={() => {
              dispatch(
                updateWalletPublicKey({
                  walletPublicKey: undefined,
                }),
              )
              RNRestart.restart()
            }}
          >
            <Text>Connected Wallet: {wallet}. Tap to disconnect</Text>
          </TouchableOpacity>
        )}
        <NavigationContainer
          onReady={() => {
            if (routeNameRef.current) {
              // @ts-ignore
              routeNameRef.current =
                navigationRef.current.getCurrentRoute().name
            }
          }}
          theme={NavigationTheme}
          ref={navigationRef}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current
            // @ts-ignore
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name
            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              })
            }
            // @ts-ignore
            routeNameRef.current = currentRouteName
          }}
        >
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                opacity: 0,
              },
              headerBackgroundContainerStyle: {
                opacity: 0,
              },
            }}
          >
            <Stack.Screen name="Startup" component={StartupContainer} />
            <Stack.Screen
              name={AppRoutes.CHOOSE_FRAME}
              component={ChooseFrameContainer}
            />
            <Stack.Screen
              name={AppRoutes.CAPTURE_PHOTO}
              component={CapturePhotoContainer}
            />
            <Stack.Screen
              name={AppRoutes.MINT_NFT}
              component={MintNFTContainer}
            />
            <Stack.Screen
              name={AppRoutes.CONNECT_WALLET}
              component={ConnectWalletContainer}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </WalletProvider>
  )
}

export default ApplicationNavigator
