import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Divider from '@/Components/Divider'

const EditEventContainer = () => {
  const { Gutters, Layout, Fonts } = useTheme()

  return (
    <View style={[Layout.fill]}>
      <ScrollView
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularTPadding,
        ]}
      >
        <View>
          <Text style={[Fonts.textLarge, Fonts.bold, Fonts.textBlack]}>
            Update Event
          </Text>
        </View>
        <Divider />
      </ScrollView>
    </View>
  )
}

export default EditEventContainer
