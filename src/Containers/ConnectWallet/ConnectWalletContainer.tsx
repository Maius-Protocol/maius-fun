import React, { useEffect } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Button } from '@ant-design/react-native'
import { useMutation } from 'react-query'
import { useWallet } from '@/Hooks/useWallet'
import { useDispatch, useSelector } from 'react-redux'
import { updateWalletPublicKey, walletPublicKey } from '@/Store/Wallet'
import { navigationRef } from '@/Navigators/utils'
import { Config } from '@/Config'
import MockData from '@/Config/mock'
import ConnectWithSmsWallet from '@/Components/ConnectWithSmsWallet'

const ConnectWalletContainer = () => {
  const dispatch = useDispatch()
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const wallet = useSelector(walletPublicKey)
  const { connect } = useWallet()
  const { isLoading, mutate } = useMutation(connect)

  useEffect(() => {
    if (wallet) {
      navigationRef.goBack()
    }
  }, [wallet])

  return (
    <SafeAreaView>
      <View
        style={[
          Layout.fullSize,
          Layout.center,
          Gutters.regularHPadding,
          Layout.maxWidthTablet,
        ]}
      >
        <View style={[Layout.fill, Layout.center]}>
          <View
            style={{
              height: windowWidth * 0.5,
              width: windowWidth * 0.5,
            }}
          >
            <Lottie source={Images.animations.wifi} autoPlay loop />
          </View>
          <View style={[Layout.center]}>
            <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
              👋 Welcome to {Config.APP_NAME}!
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
              Please connect your wallet to start using app
            </Text>
          </View>
        </View>
        <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
          {Config.IS_ANDROID && <ConnectWithSmsWallet />}
          <Button
            loading={isLoading}
            onPress={() => {
              if (Config.MOCKING_ENABLED) {
                dispatch(
                  updateWalletPublicKey({
                    walletPublicKey: MockData.walletPublicKey,
                  }),
                )
                return
              }
              mutate()
            }}
            type="primary"
            style={{
              backgroundColor: '#512da8',
            }}
          >
            <View
              style={{
                flexWrap: 'wrap',
                flex: 1,
                justifyContent: 'space-between',
                padding: 30,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={Images.phantom_logo}
              />
              <Text style={[Fonts.textWhite, Fonts.bold]}>
                Connect with Phantom Wallet
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ConnectWalletContainer
