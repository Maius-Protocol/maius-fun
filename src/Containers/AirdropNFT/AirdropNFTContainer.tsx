import React, { useEffect, useRef } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useRoute } from '@react-navigation/native'
import ViaAirdrop from '@/Containers/AirdropNFT/components/ViaAirdrop'
import PagerView from 'react-native-pager-view'
import ViaNearbyUser from '@/Containers/AirdropNFT/components/ViaNearbyUser'
import ViaQRCode from '@/Containers/AirdropNFT/components/ViaQRCode'
import { SegmentedControl } from '@ant-design/react-native'

const AirdropNFTContainer = () => {
  const ref = useRef()
  const [position, setPosition] = React.useState(0)
  const { Images, Layout, Colors, Gutters } = useTheme()
  const route = useRoute()
  const params = route.params as any
  const url = params?.url

  useEffect(() => {}, [])

  return (
    <SafeAreaView>
      <View style={[Gutters.regularTMargin, Gutters.regularHPadding]}>
        <SegmentedControl
          tintColor={Colors.gray}
          selectedIndex={position}
          selectedTextColor={Colors.white}
          values={['Airdrop', 'Nearby Users', 'QR Code']}
          onChange={event => {
            ref?.current?.setPage(event.nativeEvent.selectedSegmentIndex)
            setPosition(event.nativeEvent.selectedSegmentIndex)
          }}
        />
      </View>
      <View style={[Layout.fullSize, Layout.center]}>
        <PagerView
          ref={ref}
          style={[Layout.fullSize]}
          onPageSelected={state => {
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
