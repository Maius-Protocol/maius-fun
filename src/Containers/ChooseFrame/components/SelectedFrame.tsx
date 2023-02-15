import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'

const SelectedFrame = ({
  frameUri,
  onChange = async () => {},
}: {
  frameUri: string
  onChange: () => Promise<any>
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
            source={Images.placeholder}
            resizeMode="cover"
            style={[Layout.fullSize, { zIndex: 2 }]}
          />
          <Image
            source={{ uri: frameUri }}
            resizeMode="cover"
            style={[Layout.fullSize, { zIndex: 4, position: 'absolute' }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
})

export default SelectedFrame
