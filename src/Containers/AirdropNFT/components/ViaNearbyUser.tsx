import React, { useMemo } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useCallback, useEffect } from 'react'
import {
  connect,
  publish,
  addOnErrorListener,
  NearbyConfig,
  useNearbySearch,
  useNearbySubscription,
} from 'react-native-google-nearby-messages'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Button } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { Config } from '@/Config'
import { SvgUri } from 'react-native-svg'
import { Colors } from '@/Theme/Variables'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import useSendNotify from '@/Services/mutations/useSendNotify'
import { selectedEvent } from '@/Store/Wizard'

const ViaNearbyUser = ({ url }: { url: string }) => {
  const _walletPublickey = useSelector(walletPublicKey)
  const { mutateAsync } = useSendNotify()
  const _selectedEvent = useSelector(selectedEvent)
  const event_address = _selectedEvent?.eventAccountAddress!
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const nearbyConfig = useMemo<NearbyConfig>(
    () => ({ apiKey: Config.NEARBY_MESSAGES_API_KEY }),
    [],
  )
  const { nearbyMessages } = useNearbySubscription(nearbyConfig)
  const nearbyWallets = nearbyMessages
    ?.filter(message => message !== 'undefined')
    ?.map(message => {
      const matches = message?.match(/\[([^\][]*)]/g)
      const walletAddress = matches?.[0]?.replace('[', '')?.replace(']', '')
      const fcmToken = matches?.[1]?.replace('[', '')?.replace(']', '')
      return {
        walletAddress,
        fcmToken,
      }
    })
    ?.filter(message => message.walletAddress !== 'undefined')

  return (
    <>
      <View style={[Layout.fill, Layout.center]}>
        <View
          style={[
            {
              height: maximumRes(windowWidth * 0.9),
              width: maximumRes(windowWidth * 0.9),
              flexWrap: 'wrap',
              flexDirection: 'row',
            },
          ]}
        >
          {(!nearbyWallets || nearbyWallets?.length === 0) && (
            <View
              style={{
                height: maximumRes(windowWidth * 0.9),
                width: maximumRes(windowWidth * 0.9),
              }}
            >
              <Lottie source={Images.animations.scan} autoPlay loop />
            </View>
          )}
          {nearbyWallets && nearbyWallets.length !== 0 && (
            <FlatList
              data={nearbyWallets}
              numColumns={3}
              style={[Layout.fullHeight, { marginTop: 12 }]}
              contentContainerStyle={[Layout.center]}
              renderItem={({ item: wallet }) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      mutateAsync({
                        wallet: _walletPublickey!,
                        fcm_token: wallet?.fcmToken!,
                        url: url,
                        event_address: event_address,
                      })
                    }}
                    style={[
                      Layout.center,
                      {
                        marginRight: 12,
                        marginBottom: 12,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 100,
                        backgroundColor: Colors.gray,
                      }}
                    >
                      <SvgUri
                        width="100%"
                        height="100%"
                        uri="https://source.boringavatars.com"
                      />
                    </View>
                    <Text
                      style={[
                        Fonts.textSmall,
                        Fonts.bold,
                        Fonts.textCenter,
                        { maxWidth: 64, marginTop: 2 },
                      ]}
                      numberOfLines={2}
                    >
                      {wallet.walletAddress}
                    </Text>
                  </TouchableOpacity>
                )
              }}
            />
          )}
        </View>

        <ActivityIndicator />
        <View style={[Layout.center, Layout.fill]}>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textGray,
              Fonts.bold,
              Fonts.textCenter,
            ]}
          >
            Nearby users that using this app will display here
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBlack,
              Fonts.regular,
              Fonts.textCenter,
              Gutters.smallTMargin,
              Fonts.textCenter,
            ]}
          >
            Tap to send them a mint NFT notification.
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}></View>
    </>
  )
}

export default ViaNearbyUser
