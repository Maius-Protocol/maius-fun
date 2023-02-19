import React, { useEffect } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/Hooks'
import Divider from '@/Components/Divider'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppRoutes, navigate } from '@/Navigators/utils'
import { DataStore } from 'aws-amplify'
import { Event, LazyEvent } from '@/models'
import useEvents from '@/Services/queries/useEvents'
import { Colors, wp } from '@/Theme/Variables'
import { maximumRes } from '@/Config/dimensions'

const EventContainer = () => {
  const { top } = useSafeAreaInsets()
  const { Gutters, Layout, Fonts, Images } = useTheme()
  const { data, refetch, isRefetching: isLoading } = useEvents()

  const selectEvent = (event: LazyEvent) => {
    navigate(AppRoutes.CHOOSE_FRAME, event)
  }

  useEffect(() => {
    const subscription = DataStore.observe(Event).subscribe(msg => {
      console.log(msg)
      refetch()
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <View style={[Layout.fill, { marginTop: top }]}>
      <Image
        source={Images.blur_2}
        style={[{ position: 'absolute' }, Layout.fullSize]}
        resizeMode="cover"
      />
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
            onPress={() => {
              navigate(AppRoutes.ADD_NEW_EVENT, {})
            }}
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

      <FlatList
        onRefresh={() => refetch()}
        data={data}
        refreshing={isLoading}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                selectEvent(item)
              }}
            >
              <View
                style={[
                  Layout.row,
                  Layout.alignItemsCenter,
                  Layout.justifyContentBetween,
                  Gutters.regularVPadding,
                  Gutters.regularHPadding,
                  Gutters.regularVMargin,
                  {
                    backgroundColor: index % 2 === 0 ? '#f6956a' : '#e0d2ef',
                    borderColor: Colors.gray,
                    borderRadius: 8,
                  },
                ]}
              >
                <View style={[Layout.row]}>
                  {item?.frame_url && (
                    <Image
                      source={{ uri: item?.frame_url }}
                      style={[
                        {
                          width: 96,
                          height: 96,
                          borderColor: Colors.gray,
                          borderRadius: 6,
                        },
                        Gutters.regularRMargin,
                      ]}
                    />
                  )}
                  <View style={[Layout.justifyContentBetween]}>
                    <View>
                      <Text style={[Fonts.bold, { fontSize: 18 }]}>
                        {item?.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          Fonts.regular,
                          { fontSize: 14, width: maximumRes(wp('40%')) },
                        ]}
                      >
                        Host: {item?.host_pk}
                      </Text>
                      <Text style={[Fonts.regular, { fontSize: 14 }]}>
                        Remaining: 100 NFTs
                      </Text>
                    </View>
                    <View
                      style={[
                        {
                          backgroundColor: '#edecf0',
                          paddingVertical: 4,
                          borderRadius: 24,
                        },
                        Layout.center,
                        Gutters.smallTMargin,
                      ]}
                    >
                      <Text style={[Fonts.bold, { fontSize: 16 }]}>
                        {item?.status}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Icon name="chevron-forward" size={24} />
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularVPadding,
          Layout.maxWidthTablet,
        ]}
      />
    </View>
  )
}

export default EventContainer
