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
import ImageResizer from '@bam.tech/react-native-image-resizer'
import { isSmsWallet } from '@/Store/Wallet'
import useSolanaPayInstruction from '@/Services/mutations/useSolanaPayInstruction'
import { useMutation } from 'react-query'
import { Config } from '@/Config'
import { useWallet } from '@/Hooks/useWallet'

const MintNFTContainer = () => {
  const { bottom } = useSafeAreaInsets()
  const _isSmsWallet = useSelector(isSmsWallet)
  const _selectedPhoto = useSelector(selectedPhoto)
  const _selectedFrame = useSelector(selectedFrame)
  const _selectedEvent = useSelector(selectedEvent)
  const { mutateAsync: getInstructionFromSolanaPay } = useSolanaPayInstruction()
  const { signAndSendTransaction } = useWallet()
  const event_address = _selectedEvent?.eventAccountAddress!
  const {
    // data,
    mutateAsync: uploadImage,
    isLoading: isUploadingImage,
  } = useUploadImage(event_address)
  const { Images, Layout, Fonts, Gutters, MetricsSizes } = useTheme()

  const data = {
    data: {
      data: {
        image:
          'https://cdn.maius.fun/assets/bb3bfcd4-95e1-4cd7-a185-9995c502dae7.jpeg',
        json: 'https://cdn.maius.fun/assets/bb3bfcd4-95e1-4cd7-a185-9995c502dae7.json',
      },
    },
  }

  const image = data?.data?.data?.image
  const json = data?.data?.data?.json

  const { mutateAsync: startMint, isLoading: isLoading } = useMutation(
    async () => {
      const url = buildSolanaPayUrl(event_address, {
        image,
        json,
        event_address: _selectedEvent?.eventAccountAddress,
        message: `${_selectedEvent?.name}`,
      })
      if (_isSmsWallet) {
        const instructions = await getInstructionFromSolanaPay({ url })
        await signAndSendTransaction(Buffer.from(instructions, 'base64'))
        return
      }
      const supported = await Linking.canOpenURL(url)

      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`)
      }
    },
  )

  console.log(_isSmsWallet)
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
    return 'Something wrong. Please try again later.'
  }, [isUploadingImage, data])

  const uploadImageWrapped = async () => {
    const front = await ImageResizer.createResizedImage(
      _selectedPhoto!,
      Config.MAXIMUM_IMAGE_RES,
      Config.MAXIMUM_IMAGE_RES,
      'JPEG',
      80,
      0,
    )
    await uploadImage({
      front: front.uri!,
      background: _selectedFrame!,
    })
  }

  useEffect(() => {
    // uploadImageWrapped()
    // TODO: Ensure if front image is selected && background image is selected
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
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textGray,
              Fonts.bold,
              Fonts.textCenter,
            ]}
          >
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
          disabled={isUploadingImage || !image || !json}
          loading={isUploadingImage || isLoading}
          onPress={() => startMint()}
          type="primary"
        >
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>Mint NFT</Text>
        </Button>

        {!isUploadingImage && json && (
          <TouchableOpacity
            onPress={() => {
              const url = buildSolanaPayUrl(event_address, {
                image,
                json,
                event_address: _selectedEvent?.eventAccountAddress,
                message: `${_selectedEvent?.name}`,
              })
              navigate(AppRoutes.AIRDROP_NFT, { url })
            }}
            style={[Gutters.regularVPadding]}
          >
            <Text style={[Fonts.textGray, Fonts.textCenter]}>
              Share with your Friends!
            </Text>
          </TouchableOpacity>
        )}

        {/*<TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>*/}
        {/*  <Text style={[Fonts.textGray, Fonts.textCenter]}>Skip</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

export default MintNFTContainer
