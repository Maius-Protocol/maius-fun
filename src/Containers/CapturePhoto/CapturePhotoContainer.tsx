import React from 'react'
import { Button, View } from '@ant-design/react-native'
import { useAppDispatch } from '@/Store'
import { useTheme } from '@/Hooks'
import { useMutation } from 'react-query'
import { launchCamera } from 'react-native-image-picker'
import { changeWizardStep, WizardSteps } from '@/Store/Wizard'
import { windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Text, TouchableOpacity } from 'react-native'

const CapturePhotoContainer = () => {
  const dispatch = useAppDispatch()
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const { mutateAsync: pickFrame, isLoading } = useMutation(async () => {
    const result = await launchCamera({
      // presentationStyle: 'fullScreen',
      mediaType: 'photo',
    })
    console.log(result)
    return result
  })

  const skip = () => {
    dispatch(
      changeWizardStep({
        step: WizardSteps.CAPTURE_PHOTO,
      }),
    )
  }

  return (
    <View style={[Layout.fullSize, Layout.center, Gutters.regularHPadding]}>
      <View style={[Layout.fill, Layout.center]}>
        <View style={{ height: windowWidth * 0.5, width: windowWidth * 0.5 }}>
          <Lottie source={Images.animations.camera} autoPlay loop />
        </View>
        <View>
          <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
            Step 2: Choose your photo
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBlack,
              Fonts.regular,
              Fonts.textCenter,
              Gutters.smallTMargin,
            ]}
          >
            Lorem ipsum
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
        <Button
          loading={isLoading}
          onPress={() => {
            pickFrame()
          }}
          type="primary"
        >
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>Capture</Text>
        </Button>
        <TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>
          <Text style={[Fonts.textGray, Fonts.textCenter]}>
            or choose from Photos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CapturePhotoContainer
