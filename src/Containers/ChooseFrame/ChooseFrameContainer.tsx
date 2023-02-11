import React from 'react'
import { ImagePicker, View } from '@ant-design/react-native'
import { SafeAreaView } from 'react-native'
import Lottie from 'lottie-react-native'
import { useTheme } from '@/Hooks'

const ChooseFrameContainer = () => {
  const { Images, Layout } = useTheme()
  return (
    <View style={[Layout.fill]}>
      <View style={{ height: 200, width: 200 }}>
        <Lottie source={Images.animations.image} autoPlay loop />
      </View>
    </View>
  )
}

export default ChooseFrameContainer
