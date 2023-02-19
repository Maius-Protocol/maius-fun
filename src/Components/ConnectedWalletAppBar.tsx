import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { updateWalletPublicKey, walletPublicKey } from '@/Store/Wallet'
import RNRestart from 'react-native-restart'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { sleepAwait } from 'sleep-await'
import { useMutation } from 'react-query'
import { ActivityIndicator } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from '@/Navigators/utils'

const ConnectedWalletAppBar = ({ back }: { back?: boolean }) => {
  const { Gutters, Fonts, Layout } = useTheme()
  const wallet = useSelector(walletPublicKey)
  const dispatch = useDispatch()
  const { isLoading, mutateAsync } = useMutation(async () => {
    dispatch(
      updateWalletPublicKey({
        walletPublicKey: undefined,
      }),
    )
    await sleepAwait(1000)
    RNRestart.restart()
  })
  if (!wallet) {
    return <></>
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background }}>
      <View
        style={[
          Gutters.smallVPadding,
          Gutters.smallHPadding,
          Layout.center,
          Layout.row,
          Layout.justifyContentBetween,
        ]}
      >
        {back && (
          <TouchableOpacity
            onPress={() => {
              navigationRef.goBack()
            }}
            style={[Gutters.largeRPadding, Layout.row, Layout.alignItemsCenter]}
          >
            <Icon name="chevron-back-outline" size={20} />
            <Text style={[Fonts.bold]}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            Gutters.smallVPadding,
            Gutters.smallHPadding,
            { borderRadius: 8, borderWidth: 1, borderColor: Colors.gray },
            Layout.fill,
          ]}
          onPress={() => mutateAsync()}
        >
          <Text style={[Fonts.bold, Fonts.textGray]} numberOfLines={1}>
            Wallet: {wallet}
          </Text>
          {!isLoading && (
            <Text style={[Fonts.regular, Gutters.smallTMargin]}>
              Tap to disconnect
            </Text>
          )}
          {isLoading && (
            <View style={[Gutters.smallTMargin]}>
              <ActivityIndicator />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConnectedWalletAppBar
