import React from 'react'
import { Alert, SafeAreaView, Share, Text, View } from 'react-native'
import { windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Button } from '@ant-design/react-native'
import { Config } from '@/Config'
import { updateWalletPublicKey } from '@/Store/Wallet'
import MockData from '@/Config/mock'
import { useTheme } from '@/Hooks'
import { useMutation } from 'react-query'

const AirdropNFTContainer = () => {
  const { Images, Layout, Fonts, Gutters } = useTheme()

  const { isLoading, mutateAsync } = useMutation(async () => {
    try {
      const result = await Share.share({
        url: '',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  })

  return (
    <SafeAreaView>
      <View style={[Layout.fullSize, Layout.center, Gutters.regularHPadding]}>
        <View style={[Layout.fill, Layout.center]}>
          <View
            style={{
              height: windowWidth * 0.5,
              width: windowWidth * 0.5,
            }}
          >
            {/*<Lottie source={Images.animations.wifi} autoPlay loop />*/}
          </View>
          <View style={[Layout.center]}>
            <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
              Airdrop to people around you!
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textBlack,
                Fonts.regular,
                Fonts.textCenter,
                Gutters.smallTMargin,
              ]}
            >
              Let's share this with iOS or Android devices
            </Text>
          </View>
        </View>
        <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
          <Button
            loading={isLoading}
            onPress={() => {
              mutateAsync()
            }}
            type="primary"
          >
            <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
              Share with Airdrop
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AirdropNFTContainer
