import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import analytics from '@react-native-firebase/analytics'
import WizardContainer from '@/Containers/Wizard/WizardContainer'
const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const routeNameRef = React.useRef()
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.background }]}>
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="Main"
            component={WizardContainer}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
