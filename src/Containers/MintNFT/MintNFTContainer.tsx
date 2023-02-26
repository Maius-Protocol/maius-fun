import React, { useEffect, useMemo } from 'react'
import { Button, View } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { Alert, Linking, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectedEvent, selectedFrame, selectedPhoto } from '@/Store/Wizard'
import AnimatedScanner from '@/Components/AnimatedScanner'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import useUploadImage from '@/Services/mutations/useUploadImage'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { buildSolanaPayUrl } from '@/Utils/buildUrl'
import { AppRoutes, navigate } from '@/Navigators/utils'
const MintNFTContainer = () => {
  const { bottom } = useSafeAreaInsets()
  const _selectedPhoto = useSelector(selectedPhoto)
  const _selectedFrame = useSelector(selectedFrame)
  const _selectedEvent = useSelector(selectedEvent)
  const event_address = _selectedEvent?.eventAccountAddress!
  const {
    data,
    mutateAsync: uploadImage,
    isLoading: isUploadingImage,
  } = useUploadImage(event_address)
  const { Images, Layout, Fonts, Gutters, MetricsSizes } = useTheme()

  // const data = {
  //   data: {
  //     data: {
  //       image:
  //         'https://cdn.maiuspay.com/mairdrop/ad89c2e6-0c83-4074-8034-2a3b106ab8dd.jpeg',
  //       json: 'https://cdn.maiuspay.com/mairdrop/ad89c2e6-0c83-4074-8034-2a3b106ab8dd.json',
  //     },
  //   },
  // }
  const image = data?.data?.data?.image
  const json = data?.data?.data?.json

  console.log(image, json, _selectedEvent?.eventAccountAddress)

  const buildUrl = () => {
    return buildSolanaPayUrl(event_address, {
      image,
      json,
      event_address: _selectedEvent?.eventAccountAddress,
      message: `${_selectedEvent?.name}`,
    })
  }

  const startMint = async () => {
    const url = buildUrl()
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }

  const progress = useMemo(() => {
    if (data) {
      return 100
    }
    if (isUploadingImage) {
      return 50
    }
    return 0
  }, [data, isUploadingImage])

  const currentStatusText = useMemo(() => {
    if (isUploadingImage) {
      return "We're processing your image. Please wait a moment."
    }
    if (data) {
      return 'Your NFT is ready to be minted!'
    }
    return ''
  }, [isUploadingImage, data])

  useEffect(() => {
    // TODO: Ensure if front image is selected && background image is selected
    uploadImage({
      front: _selectedPhoto!,
      background: _selectedFrame!,
    })
  }, [])

  console.log(data?.data?.data)

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
              imageUri={_selectedPhoto}
              frameUri={_selectedFrame}
            />
            {/*// @ts-ignore*/}
            <AnimatedScanner progress={progress} duration={2000} />
          </View>
        </View>

        <View>
          <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
            Step 3: Let's mint NFT!
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
            {currentStatusText}
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, { marginBottom: bottom + 24 }]}>
        <Button
          // disabled
          loading={isUploadingImage}
          onPress={startMint}
          type="primary"
        >
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>Mint NFT</Text>
        </Button>

        <TouchableOpacity
          onPress={() => {
            const url = buildUrl()
            navigate(AppRoutes.AIRDROP_NFT, { url })
          }}
          style={[Gutters.regularVPadding]}
        >
          <Text style={[Fonts.textGray, Fonts.textCenter]}>
            Share with your Friends!
          </Text>
        </TouchableOpacity>

        {/*<TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>*/}
        {/*  <Text style={[Fonts.textGray, Fonts.textCenter]}>Skip</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

export default MintNFTContainer
