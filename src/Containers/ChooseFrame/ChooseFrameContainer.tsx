import React, { useEffect } from 'react'
import { Button, View } from '@ant-design/react-native'
import { Text } from 'react-native'
import Lottie from 'lottie-react-native'
import { useTheme } from '@/Hooks'
import { launchImageLibrary } from 'react-native-image-picker'
import { useMutation } from 'react-query'
import { useAppDispatch } from '@/Store'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import { AppRoutes, navigate } from '@/Navigators/utils'
import { changeFrame, changeSelectedEvent, selectedFrame } from '@/Store/Wizard'
import { useSelector } from 'react-redux'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import { useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Event } from '@/types/schema'

const ChooseFrameContainer = () => {
  const { bottom } = useSafeAreaInsets()
  const route = useRoute()
  const params = route.params as Partial<Event>
  const dispatch = useAppDispatch()
  const _selectedFrame = useSelector(selectedFrame)
  const { Images, Layout, Fonts, Gutters } = useTheme()
  const { mutateAsync: pickFrame, isLoading } = useMutation(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    })
    const { assets } = result
    const asset = assets?.[0]
    if (asset) {
      dispatch(
        changeFrame({
          selectedFrame: asset.uri,
        }),
      )
    }
    return asset
  })

  const nextStep = () => {
    navigate(AppRoutes.CAPTURE_PHOTO, {})
  }

  useEffect(() => {
    dispatch(
      changeFrame({
        selectedFrame: params?.frameUrl!,
      }),
    )
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
        {_selectedFrame && (
          <View style={[Layout.center, Gutters.smallBMargin]}>
            <Text style={[Fonts.regular]}>Tap image to change</Text>
          </View>
        )}
        <View
          style={[
            {
              height: maximumRes(windowWidth * 0.6),
              width: maximumRes(windowWidth * 0.6),
            },
          ]}
        >
          {!_selectedFrame && (
            <Lottie source={Images.animations.image} autoPlay loop />
          )}
          {_selectedFrame && (
            <SelectedFrameImage
              imageUri={undefined}
              onChange={pickFrame}
              frameUri={_selectedFrame}
            />
          )}
        </View>

        <View style={[Layout.center, Gutters.largeTMargin]}>
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
            Your host set the frame for this event. You can start taking photo
            with this frame or choose another frame if you want.
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
        <View>
          {!_selectedFrame && (
            <Button
              loading={isLoading}
              onPress={() => {
                pickFrame()
              }}
              type="primary"
            >
              <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
                Choose Frame
              </Text>
            </Button>
          )}
          {_selectedFrame && (
            <Button
              onPress={nextStep}
              style={{ marginBottom: bottom }}
              type="primary"
            >
              <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
                Apply & Next Step
              </Text>
            </Button>
          )}
        </View>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    nextStep()*/}
        {/*    dispatch(*/}
        {/*      changeFrame({*/}
        {/*        selectedFrame: undefined,*/}
        {/*      }),*/}
        {/*    )*/}
        {/*  }}*/}
        {/*  style={[Gutters.regularVPadding]}*/}
        {/*>*/}
        {/*  <Text style={[Fonts.textGray, Fonts.textCenter, Fonts.bold]}>*/}
        {/*    Skip*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

export default ChooseFrameContainer
