import React from 'react'
import { Button, View } from '@ant-design/react-native'
import { useTheme } from '@/Hooks'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Image, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectedFrame, selectedPhoto } from '@/Store/Wizard'
import AnimatedScanner from '@/Components/AnimatedScanner'
import { useMutation } from 'react-query'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import useUploadImage from '@/Services/mutations/useUploadImage'
// import useMintInstruction from '@/Services/mutations/useMintInstruction'
const MintNFTContainer = () => {
  const _selectedPhoto = useSelector(selectedPhoto)
  const _selectedFrame = useSelector(selectedFrame)
  const { mutateAsync: uploadImage, isLoading: isUploadingImage } =
    useUploadImage()
  const { Images, Layout, Fonts, Gutters, MetricsSizes } = useTheme()
  // const {} = useMintInstruction()

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
            <AnimatedScanner progress={100} duration={6000} />
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
        <Button loading={isUploadingImage} onPress={uploadImage} type="primary">
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>
            Processing Image
          </Text>
        </Button>

        {/*<TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>*/}
        {/*  <Text style={[Fonts.textGray, Fonts.textCenter]}>Skip</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

export default MintNFTContainer
