import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/Hooks'
import Divider from '@/Components/Divider'
import Icon from 'react-native-vector-icons/Ionicons'

const EventContainer = () => {
  const { top } = useSafeAreaInsets()
  const { Gutters, Layout, Fonts } = useTheme()

  return (
    <View style={[Layout.fill, { marginTop: top }]}>
      <View style={[Gutters.regularHPadding, Gutters.regularTPadding]}>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <Text style={[Fonts.textLarge, Fonts.bold, Fonts.textBlack]}>
            Events
          </Text>
          <TouchableOpacity
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
            ]}
          >
            <Icon
              name="add-circle-outline"
              size={28}
              style={{ marginRight: 4 }}
            />
            <Text style={[Fonts.bold]}>Add new event</Text>
          </TouchableOpacity>
        </View>
        <Divider />
      </View>

      <ScrollView
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularVPadding,
        ]}
      ></ScrollView>
    </View>
  )
}

export default EventContainer
