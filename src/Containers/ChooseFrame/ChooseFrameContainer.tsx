import React from 'react'
import { Button, View } from '@ant-design/react-native'
import { Text, TouchableOpacity } from 'react-native'
import Lottie from 'lottie-react-native'
import { useTheme } from '@/Hooks'
import { launchImageLibrary } from 'react-native-image-picker'
import { useMutation } from 'react-query'
import { changeWizardStep, WizardSteps } from '@/Store/Wizard'
import { useAppDispatch } from '@/Store'
import { windowWidth } from '@/Config/dimensions'
import { AppRoutes, navigate } from '@/Navigators/utils'

const ChooseFrameContainer = () => {
  const dispatch = useAppDispatch()
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const { mutateAsync: pickFrame, isLoading } = useMutation(async () => {
    const result = await launchImageLibrary({
      // presentationStyle: 'fullScreen',
      mediaType: 'photo',
    })
    return result
  })

  const skip = () => {
    // dispatch(
    //   changeWizardStep({
    //     step: WizardSteps.CAPTURE_PHOTO,
    //   }),
    // )
    navigate(AppRoutes.CAPTURE_PHOTO, {})
  }

  return (
    <View style={[Layout.fullSize, Layout.center, Gutters.regularHPadding]}>
      <View style={[Layout.fill, Layout.center]}>
        <View style={{ height: windowWidth * 0.5, width: windowWidth * 0.5 }}>
          <Lottie source={Images.animations.image} autoPlay loop />
        </View>
        <View>
          <Text style={[Fonts.textRegular, Fonts.textGray, Fonts.bold]}>
            Step 1: Choose your unique frame
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
          loading={isLoading}
          onPress={() => {
            pickFrame()
          }}
          type="primary"
        >
          <Text style={[Fonts.textWhite, Fonts.textCenter]}>Choose Frame</Text>
        </Button>
        <TouchableOpacity onPress={skip} style={[Gutters.regularVPadding]}>
          <Text style={[Fonts.textGray, Fonts.textCenter]}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChooseFrameContainer
