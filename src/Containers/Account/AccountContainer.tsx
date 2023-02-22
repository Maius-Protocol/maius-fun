import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateKeypairSecret,
  updateSession,
  updateSharedSecret,
  updateWalletPublicKey,
  walletPublicKey,
} from '@/Store/Wallet'
import { useMutation } from 'react-query'
import { sleepAwait } from 'sleep-await'
import RNRestart from 'react-native-restart'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { SvgUri } from 'react-native-svg'
import Divider from '@/Components/Divider'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '@/Theme/Variables'
import { ActivityIndicator } from '@ant-design/react-native'

const AccountContainer = () => {
  const { top } = useSafeAreaInsets()
  const { Gutters, Layout, Fonts, Images } = useTheme()
  const wallet = useSelector(walletPublicKey)
  const dispatch = useDispatch()
  const { mutateAsync, isLoading } = useMutation(async () => {
    dispatch(
      updateWalletPublicKey({
        walletPublicKey: undefined,
      }),
    )
    dispatch(
      updateSharedSecret({
        sharedSecret: undefined,
      }),
    )
    dispatch(
      updateKeypairSecret({
        dappKeypairSecret: undefined,
      }),
    )
    dispatch(
      updateSession({
        session: undefined,
      }),
    )
    await sleepAwait(2000)
    RNRestart.restart()
  })
  return (
    <View style={[Layout.fill, { marginTop: top }]}>
      <Image
        source={Images.blur_1}
        style={[{ position: 'absolute' }, Layout.fullSize]}
        resizeMode="cover"
      />
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
          Layout.maxWidthTablet,
          Layout.fullWidth,
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

        {isLoading && (
          <View style={[Gutters.smallTMargin]}>
            <ActivityIndicator />
          </View>
        )}
        {!isLoading && (
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
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentCenter,
                  Gutters.smallTMargin,
                  Layout.alignItemsCenter,
                ]}
              >
                <Text
                  style={[
                    Fonts.regular,
                    Fonts.textGray,
                    Fonts.textCenter,
                    { fontSize: 18 },
                  ]}
                >
                  Tap to disconnect
                </Text>
                <Icon name="chevron-forward" size={24} color={Colors.text} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={[Gutters.largeTMargin]}>
          <Text style={[Fonts.textRegular, Fonts.bold, Fonts.textBlack]}>
            List of minted NFTs
          </Text>
          <Divider />
        </View>
        <Text style={[Gutters.smallTMargin]}>Coming Soon</Text>
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
