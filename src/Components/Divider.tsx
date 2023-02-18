import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'

const Divider = () => {
  const { Layout, Gutters } = useTheme()

  return (
    <View
      style={[
        Layout.fullWidth,
        Gutters.regularTMargin,
        { height: 0.5, backgroundColor: Colors.gray },
      ]}
    />
  )
}

export default Divider
