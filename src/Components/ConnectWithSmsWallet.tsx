import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '@ant-design/react-native'
import { Config } from '@/Config'
import { updateWalletPublicKey } from '@/Store/Wallet'
import MockData from '@/Config/mock'
import { useTheme } from '@/Hooks'

const ConnectWithSmsWallet = () => {
  const { Images, Layout, Fonts, Gutters, Colors } = useTheme()
  return (
    <Button
      onPress={() => {}}
      type="primary"
      style={[{ backgroundColor: Colors.success }, Gutters.smallBMargin]}
    >
      <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
        Connect with Saga Wallet
      </Text>
    </Button>
  )
}

export default ConnectWithSmsWallet
