import React, { useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useRoute } from '@react-navigation/native'
import ViaAirdrop from '@/Containers/AirdropNFT/components/ViaAirdrop'
import PagerView from 'react-native-pager-view'
import ViaNearbyUser from '@/Containers/AirdropNFT/components/ViaNearbyUser'
import ViaQRCode from '@/Containers/AirdropNFT/components/ViaQRCode'

const AirdropNFTContainer = () => {
  const [position, setPosition] = React.useState(0)
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const route = useRoute()
  const params = route.params as any
  const url = params?.url

  useEffect(() => {}, [])

  return (
    <SafeAreaView>
      <View style={[Layout.fullSize, Layout.center]}>
        <View>
          <Text style={[Layout.center, Fonts.bold, Fonts.textRegular]}>
            Method {position + 1}/3
          </Text>
        </View>
        <PagerView
          style={[Layout.fullSize]}
          onPageSelected={state => {
            console.log(state.nativeEvent.position)
            setPosition(state.nativeEvent.position)
          }}
          initialPage={0}
        >
          <View key="1">
            <View
              style={[
                Layout.fullSize,
                Layout.center,
                Gutters.regularHPadding,
                Layout.maxWidthTablet,
                Layout.fullWidth,
              ]}
            >
              <ViaAirdrop url={url} />
            </View>
          </View>
          <View key="2">
            <ViaNearbyUser url={url} />
          </View>
          <View key="3">
            <ViaQRCode url={url} />
          </View>
        </PagerView>
      </View>
    </SafeAreaView>
  )
}

export default AirdropNFTContainer
