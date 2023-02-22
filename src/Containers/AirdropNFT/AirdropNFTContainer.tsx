import React from 'react'
import { Alert, SafeAreaView, Share, Text, View } from 'react-native'
import { windowWidth } from '@/Config/dimensions'
import { Button } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { useMutation } from 'react-query'
import { useRoute } from '@react-navigation/native'

const AirdropNFTContainer = () => {
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const route = useRoute()
  const params = route.params as any
  const url = params?.url

  const { isLoading, mutateAsync } = useMutation(async () => {
    try {
      const result = await Share.share({
        url: url,
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
      <View
        style={[
          Layout.fullSize,
          Layout.center,
          Gutters.regularHPadding,
          Layout.maxWidthTablet,
          Layout.fullWidth,
        ]}
      >
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
              Let's share this moment with iOS via Airdrop or Android devices
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
