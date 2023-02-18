import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { updateWalletPublicKey, walletPublicKey } from '@/Store/Wallet'
import { useMutation } from 'react-query'
import { sleepAwait } from 'sleep-await'
import RNRestart from 'react-native-restart'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { SvgUri } from 'react-native-svg'
import Divider from '@/Components/Divider'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AccountContainer = () => {
  const { top } = useSafeAreaInsets()
  const { Gutters, Layout, Fonts } = useTheme()
  const wallet = useSelector(walletPublicKey)
  const dispatch = useDispatch()
  const { mutateAsync } = useMutation(async () => {
    dispatch(
      updateWalletPublicKey({
        walletPublicKey: undefined,
      }),
    )
    await sleepAwait(1000)
    RNRestart.restart()
  })
  return (
    <View style={[Layout.fill, { marginTop: top }]}>
      <View style={[Gutters.regularHPadding, Gutters.regularTPadding]}>
        <Text style={[Fonts.textLarge, Fonts.bold, Fonts.textBlack]}>
          Your Wallet
        </Text>
        <Divider />
      </View>
      <ScrollView
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularVPadding,
        ]}
      >
        <View
          style={[
            {
              height: maximumRes(windowWidth * 0.4),
              width: maximumRes(windowWidth * 0.4),
            },
            Layout.fullWidth,
            Layout.justifyContentCenter,
            Gutters.smallTMargin,
          ]}
        >
          <SvgUri
            width="100%"
            height="100%"
            uri="https://source.boringavatars.com"
          />
        </View>

        <TouchableOpacity onPress={() => mutateAsync()}>
          <View style={[Gutters.largeTMargin]}>
            <Text
              style={[
                Fonts.bold,
                Fonts.textGray,
                Fonts.textCenter,
                { fontSize: 24 },
              ]}
              numberOfLines={2}
            >
              {wallet}
            </Text>
            <Text
              style={[
                Fonts.regular,
                Fonts.textGray,
                Fonts.textCenter,
                Gutters.smallTMargin,
                { fontSize: 18 },
              ]}
            >
              Tap to disconnect
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/*<TouchableOpacity*/}
      {/*  style={[*/}
      {/*    Gutters.smallVPadding,*/}
      {/*    Gutters.smallHPadding,*/}
      {/*    { borderRadius: 8, borderWidth: 1, borderColor: Colors.gray },*/}
      {/*  ]}*/}
      {/*  onPress={() => mutateAsync()}*/}
      {/*>*/}
      {/*  <Text style={[Fonts.bold, Fonts.textGray]} numberOfLines={1}>*/}
      {/*    Wallet: {wallet}*/}
      {/*  </Text>*/}
      {/*  {!isLoading && (*/}
      {/*    <Text style={[Fonts.regular, Gutters.smallTMargin]}>*/}
      {/*      Tap to disconnect*/}
      {/*    </Text>*/}
      {/*  )}*/}
      {/*  {isLoading && (*/}
      {/*    <View style={[Gutters.smallTMargin]}>*/}
      {/*      <ActivityIndicator />*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*</TouchableOpacity>*/}
    </View>
  )
}

export default AccountContainer
