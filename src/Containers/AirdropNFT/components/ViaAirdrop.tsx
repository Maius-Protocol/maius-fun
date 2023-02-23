import React from 'react'
import { Alert, Share, Text, View } from 'react-native'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Button } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { useMutation } from 'react-query'

const ViaAirdrop = ({ url }: { url: string }) => {
  const { Images, Layout, Fonts, Gutters } = useTheme()

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
    <>
      <View style={[Layout.fill, Layout.center]}>
        <View
          style={{
            height: maximumRes(windowWidth * 0.9),
            width: maximumRes(windowWidth * 0.9),
          }}
        >
          <Lottie source={Images.animations.share} autoPlay loop />
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
    </>
  )
}

export default ViaAirdrop
