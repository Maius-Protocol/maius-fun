import React from 'react'
import { Button, View } from '@ant-design/react-native'
import { useAppDispatch } from '@/Store'
import { useTheme } from '@/Hooks'
import { useMutation } from 'react-query'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { changePhoto, selectedFrame, selectedPhoto } from '@/Store/Wizard'
import { maximumRes, windowWidth } from '@/Config/dimensions'
import Lottie from 'lottie-react-native'
import { Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import { AppRoutes, navigate } from '@/Navigators/utils'

const CapturePhotoContainer = () => {
  const dispatch = useAppDispatch()
  const _selectedPhoto = useSelector(selectedPhoto)
  const _selectedFrame = useSelector(selectedFrame)

  const { Images, Layout, Fonts, Gutters } = useTheme()
  const { mutateAsync: pickPhoto, isLoading } = useMutation(
    async ({ from }: { from: string }) => {
      let result
      if (from === 'camera') {
        result = await launchCamera({
          mediaType: 'photo',
        })
      } else {
        result = await launchImageLibrary({
          mediaType: 'photo',
        })
      }
      const { assets } = result
      const asset = assets?.[0]
      if (asset) {
        dispatch(
          changePhoto({
            selectedPhoto: asset.uri,
          }),
        )
      }
      return asset
    },
  )

  const skip = () => {
    navigate(AppRoutes.MINT_NFT, {})
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
        {_selectedPhoto && (
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
          {!_selectedPhoto && (
            <Lottie source={Images.animations.camera} autoPlay loop />
          )}
          {_selectedPhoto && (
            <SelectedFrameImage
              imageUri={_selectedPhoto}
              onChange={pickPhoto}
              frameUri={_selectedFrame}
            />
          )}
        </View>
        <View style={[Layout.center, Gutters.largeTMargin]}>
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
            Smileeee!
          </Text>
        </View>
      </View>
      <View style={[Layout.fullWidth, Gutters.largeBMargin]}>
        <View>
          {!_selectedPhoto && (
            <Button
              loading={isLoading}
              onPress={() => {
                pickPhoto({
                  from: 'camera',
                })
              }}
              type="primary"
            >
              <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
                Capture
              </Text>
            </Button>
          )}

          {_selectedPhoto && (
            <Button
              loading={isLoading}
              onPress={() => {
                skip()
              }}
              type="primary"
            >
              <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
                Done, Let's mint NFT!
              </Text>
            </Button>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            pickPhoto({ from: 'gallery' })
          }}
          style={[Gutters.regularVPadding]}
        >
          <Text style={[Fonts.textGray, Fonts.textCenter]}>
            or choose another from Photos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CapturePhotoContainer
