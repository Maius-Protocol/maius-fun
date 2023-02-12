import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Button } from '@ant-design/react-native'
import { useMutation } from 'react-query'
import { useWallet } from '@/Hooks/useWallet'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { navigationRef } from '@/Navigators/utils'

const ConnectWalletContainer = () => {
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
    <View style={[Layout.fullSize, Layout.center, Gutters.regularHPadding]}>
      <View style={[Layout.fill, Layout.center]}>
        <View style={{ height: windowWidth * 0.5, width: windowWidth * 0.5 }}>
          <Lottie source={Images.animations.wallet} autoPlay loop />
        </View>
        <View>
          <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
            Connect Wallet Required
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
        <Button loading={isLoading} onPress={mutate} type="primary">
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>
            Connect Wallet
          </Text>
        </Button>
      </View>
    </View>
  )
}

export default ConnectWalletContainer
