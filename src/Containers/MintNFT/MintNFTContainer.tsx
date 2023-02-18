import React, { useEffect, useMemo } from 'react'
import { Button, View } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import { selectedFrame, selectedPhoto } from '@/Store/Wizard'
import AnimatedScanner from '@/Components/AnimatedScanner'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import useUploadImage from '@/Services/mutations/useUploadImage'
const MintNFTContainer = () => {
  const _selectedPhoto = useSelector(selectedPhoto)
  const _selectedFrame = useSelector(selectedFrame)
  const {
    data,
    mutateAsync: uploadImage,
    isLoading: isUploadingImage,
  } = useUploadImage()
  const { Images, Layout, Fonts, Gutters, MetricsSizes } = useTheme()

  const progress = useMemo(() => {
    if (data) {
      return 100
    }
    if (isUploadingImage) {
      return 50
    }
    return 0
  }, [data, isUploadingImage])

  useEffect(() => {
    // TODO: Ensure if front image is selected && background image is selected
    uploadImage({
      front: _selectedPhoto!,
      background: _selectedFrame!,
    })
  }, [])

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
            <AnimatedScanner progress={progress} duration={3000} />
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
            Lorem ipsum
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
        <Button
          // disabled
          loading={isUploadingImage}
          onPress={() => {}}
          type="primary"
        >
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>Mint NFT</Text>
        </Button>

        {/*<TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>*/}
        {/*  <Text style={[Fonts.textGray, Fonts.textCenter]}>Skip</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

export default MintNFTContainer
