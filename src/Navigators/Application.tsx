import React from 'react'
import { StatusBar, View } from 'react-native'
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
import ConnectedWalletAppBar from '@/Components/ConnectedWalletAppBar'
import AirdropNFTContainer from '@/Containers/AirdropNFT/AirdropNFTContainer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EventContainer from '@/Containers/Dashboard/EventContainer'
import AccountContainer from '@/Containers/Account/AccountContainer'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const Home = () => {
  const { Colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          backgroundColor: Colors.inputBackground,
        },
      }}
    >
      <Tab.Screen name={AppRoutes.EVENTS} component={EventContainer} />
      <Tab.Screen name={AppRoutes.ACCOUNT} component={AccountContainer} />
    </Tab.Navigator>
  )
}

// @refresh reset
const ApplicationNavigator = () => {
  const routeNameRef = React.useRef()
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <WalletProvider>
      <NavigationContainer
        onReady={() => {
          if (routeNameRef.current) {
            // @ts-ignore
            routeNameRef.current = navigationRef.current.getCurrentRoute().name
          }
        }}
        theme={NavigationTheme}
        ref={navigationRef}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current
          // @ts-ignore
          const currentRouteName = navigationRef.current.getCurrentRoute().name
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
            headerLeftLabelVisible: false,
            header: ({ back }) => {
              return null
              return <ConnectedWalletAppBar back={back !== undefined} />
            },
          }}
        >
          <Stack.Screen name={AppRoutes.STARTUP} component={StartupContainer} />
          <Stack.Screen name={AppRoutes.HOME} component={Home} />

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
            name={AppRoutes.AIRDROP_NFT}
            component={AirdropNFTContainer}
          />
          <Stack.Screen
            name={AppRoutes.CONNECT_WALLET}
            component={ConnectWalletContainer}
            options={{
              presentation: 'modal',
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  )
}

export default ApplicationNavigator
