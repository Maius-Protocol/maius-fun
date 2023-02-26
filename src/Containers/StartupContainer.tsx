import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { AppRoutes, navigateAndSimpleReset } from '@/Navigators/utils'
import { Config } from '@/Config'

const StartupContainer = () => {
  const { Images, Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset(AppRoutes.HOME)
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Image
        source={Images.blur_2}
        style={[{ position: 'absolute' }, Layout.fullSize]}
        resizeMode="cover"
      />
      <Brand />
      <Text style={[Fonts.bold, Fonts.textLarge, Fonts.textBlack]}>
        {Config.APP_NAME}
      </Text>
      <Text style={[Fonts.textCenter, Fonts.regular, Fonts.textBlack]}>
        a fun product from Maius Protocol
      </Text>
      <ActivityIndicator style={[Gutters.largeVMargin]} />
    </View>
  )
}

export default StartupContainer
