import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator, Header } from '@react-navigation/stack'
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
import AirdropNFTContainer from '@/Containers/AirdropNFT/AirdropNFTContainer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AccountContainer from '@/Containers/Account/AccountContainer'
import EventContainer from '@/Containers/Event/EventContainer'
import AddNewEventContainer from '@/Containers/Event/AddNewEventContainer'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '@/Theme/Variables'
import ProgramProvider from '@/Hooks/useProgram'
import { routingInstrumentation } from '@/..'
import TopUpNFTContainer from '@/Containers/TopUpNFT/TopUpNFTContainer'
import EditEventContainer from '@/Containers/Event/EditEventContainer'
import CloseEventContainer from '@/Containers/Event/CloseEventContainer'
import CurrentNftsRemaining from '@/Components/CurrentNftsRemaining'
import BackToHome from '@/Components/BackToHome'

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
      <Tab.Screen
        options={{
          tabBarLabel: 'Events',
          tabBarStyle: {
            marginTop: 8,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
        name={AppRoutes.EVENTS}
        component={EventContainer}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Account',
          tabBarStyle: {
            marginTop: 8,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet" color={color} size={size} />
          ),
        }}
        name={AppRoutes.ACCOUNT}
        component={AccountContainer}
      />
    </Tab.Navigator>
  )
}

// @refresh reset
const ApplicationNavigator = () => {
  const routeNameRef = React.useRef()
  const { darkMode, NavigationTheme } = useTheme()

  return (
    <WalletProvider>
      <ProgramProvider>
        <NavigationContainer
          onReady={() => {
            if (routeNameRef.current) {
              // @ts-ignore
              routeNameRef.current =
                // @ts-ignore
                navigationRef.current.getCurrentRoute().name
            }
            routingInstrumentation.registerNavigationContainer(navigationRef)
          }}
          theme={NavigationTheme}
          ref={navigationRef}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current
            const currentRouteName =
              // @ts-ignore
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
                backgroundColor: Colors.background,
              },
              headerBackTitle: 'Back',
              header: props => {
                if (props.back) {
                  return <Header {...props} />
                }
                return null
              },
            }}
          >
            <Stack.Screen
              name={AppRoutes.STARTUP}
              component={StartupContainer}
            />
            <Stack.Screen name={AppRoutes.HOME} component={Home} />

            <Stack.Screen
              name={AppRoutes.CONNECT_WALLET}
              component={ConnectWalletContainer}
              options={{
                presentation: 'modal',
                headerLeft: () => null,
              }}
            />
            <Stack.Group
              screenOptions={{
                headerTitle: () => <CurrentNftsRemaining />,
                headerTitleStyle: {
                  opacity: 1,
                },
                headerBackgroundContainerStyle: {
                  opacity: 0,
                  backgroundColor: Colors.background,
                },
                headerRight: () => <BackToHome />,
              }}
            >
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
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name={AppRoutes.ADD_NEW_EVENT}
                component={AddNewEventContainer}
              />
              <Stack.Screen
                name={AppRoutes.TOP_UP_NFTS}
                component={TopUpNFTContainer}
              />
              <Stack.Screen
                name={AppRoutes.UPDATE_EVENT}
                component={EditEventContainer}
              />
              <Stack.Screen
                name={AppRoutes.CLOSE_EVENT}
                component={CloseEventContainer}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ProgramProvider>
    </WalletProvider>
  )
}

export default ApplicationNavigator
