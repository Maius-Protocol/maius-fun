import React from 'react'
import { Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { useWallet } from '@/Hooks/useWallet'
import { useMutation } from 'react-query'

const ConnectWithSmsWallet = () => {
  const { Fonts, Gutters, Colors } = useTheme()
  const { connectViaSMS } = useWallet()
  const { isLoading, mutateAsync } = useMutation(async () => {
    return await connectViaSMS()
  })

  return (
    <Button
      loading={isLoading}
      onPress={async () => {
        mutateAsync()
      }}
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
