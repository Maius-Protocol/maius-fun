import React, { useEffect, useMemo } from 'react'
import { Alert, Linking, Platform, Text, View } from 'react-native'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import AnimatedScanner from '@/Components/AnimatedScanner'
import { useTheme } from '@/Hooks'
import { Button } from '@ant-design/react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { baseUrl } from '@/Utils/buildUrl'
import queryString from 'query-string'
import useEvent from '@/Services/modules/events/useEvent'
import { useDispatch } from 'react-redux'
import { changeSelectedEvent } from '@/Store/Wizard'
import { serializeEvent } from '@/Utils/serializeEvent'

export interface IParams {
  event_address: string
  image: string
  json: string
  message: string
}

const ReceivedNFTContainer = () => {
  const dispatch = useDispatch()
  const { Images, Layout, Fonts, Gutters, MetricsSizes } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const route = useRoute()
  const params = route?.params as any
  const url = params?.solanaUrl as string
  const event_address = params?.event_address
  const wallet = params?.wallet

  const { data: eventData } = useEvent(event_address!)
  const parsedParams = useMemo(() => {
    try {
      return queryString.parse(
        decodeURIComponent(url?.replace(`solana:${baseUrl?.toString()}`, '')),
      )
    } catch (e) {
      return undefined
    }
  }, [url])
  const image = parsedParams?.image
  const json = parsedParams?.json

  const startMint = async () => {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }

  useEffect(() => {
    if (eventData) {
      dispatch(
        changeSelectedEvent({
          selectedEvent: serializeEvent(eventData, event_address!),
        }),
      )
    }
  }, [eventData])

  if (!parsedParams) {
    return <View></View>
  }

  return (
    <View
      style={[
        Layout.fullSize,
        Layout.center,
        Gutters.regularHPadding,
        Layout.maxWidthTablet,
      ]}
    >
      <View style={[Layout.fill, Layout.center]}>
        <View style={[Layout.shadow]}>
          <View
            style={[
              {
                height: maximumRes(windowWidth * 0.8),
                width: maximumRes(windowWidth * 0.8),
                borderRadius: MetricsSizes.small,
                overflow: 'hidden',
              },
              Gutters.largeBMargin,
            ]}
          >
            <SelectedFrameImage
              onChange={() => {}}
              imageUri={image}
              // frameUri={_selectedFrame}
            />
            {/*// @ts-ignore*/}
          </View>
        </View>
        <View>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textGray,
              Fonts.bold,
              Fonts.textCenter,
            ]}
          >
            You received a mint NFT request!
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBlack,
              Fonts.regular,
              Gutters.smallTMargin,
              Fonts.textCenter,
            ]}
            numberOfLines={1}
          >
            From: {wallet}
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBlack,
              Fonts.regular,
              Gutters.smallTMargin,
              Fonts.textCenter,
            ]}
          >
            Please tap mint to receive to wallet!
          </Text>
        </View>
      </View>

      <View style={[Layout.fullWidth, { marginBottom: bottom + 24 }]}>
        <Button onPress={startMint} type="primary">
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>Mint NFT</Text>
        </Button>
      </View>
    </View>
  )
}

export default ReceivedNFTContainer
