import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'

const SelectedFrameImage = ({
  imageUri,
  frameUri,
  onChange = async () => {},
}: {
  imageUri: string | undefined
  frameUri: string | undefined
  onChange: () => Promise<any> | undefined
}) => {
  const { Images, Layout, Colors } = useTheme()

  return (
    <TouchableOpacity onPress={onChange}>
      <View style={[Layout.fullSize]}>
        <View
          style={[
            {
              position: 'absolute',
              borderWidth: 0.3,
              borderColor: Colors.gray,
            },
            Layout.fullSize,
          ]}
        >
          <Image
            source={imageUri ? { uri: imageUri } : Images.placeholder}
            resizeMode="cover"
            style={[Layout.fullSize, { zIndex: 2 }]}
          />
          {frameUri && (
            <Image
              source={{ uri: frameUri }}
              resizeMode="cover"
              style={[Layout.fullSize, { zIndex: 4, position: 'absolute' }]}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SelectedFrameImage
