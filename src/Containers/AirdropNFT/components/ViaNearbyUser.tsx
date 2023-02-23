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

const ViaNearbyUser = ({ url }: { url: string }) => {
  const _walletPublickey = useSelector(walletPublicKey)

  const { Images, Layout, Fonts, Gutters } = useTheme()
  const nearbyConfig = useMemo<NearbyConfig>(
    () => ({ apiKey: Config.NEARBY_MESSAGES_API_KEY }),
    [],
  )
  const { nearbyMessages, nearbyStatus } = useNearbySubscription(nearbyConfig)

  const nearbyWallets = nearbyMessages
    ?.map(message => message?.replace('Hello from: ', ''))
    ?.filter(message => message !== 'undefined')

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
          {!nearbyWallets && (
            <View
              style={{
                height: maximumRes(windowWidth * 0.9),
                width: maximumRes(windowWidth * 0.9),
              }}
            >
              <Lottie source={Images.animations.share} autoPlay loop />
            </View>
          )}
          {nearbyWallets && (
            <FlatList
              data={nearbyWallets}
              numColumns={3}
              style={[Layout.fullHeight, { marginTop: 12 }]}
              contentContainerStyle={[Layout.center]}
              renderItem={({ item: wallet }) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      await publish(
                        `Sent NFT: from <${_walletPublickey}> to ${wallet} with url <${url}>`,
                      )
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
                      {wallet}
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
