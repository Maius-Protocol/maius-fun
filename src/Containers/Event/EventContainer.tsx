import React from 'react'
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/Hooks'
import Divider from '@/Components/Divider'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppRoutes, navigate } from '@/Navigators/utils'
import useEvents from '@/Services/modules/events/useEvents'
import { Colors, wp } from '@/Theme/Variables'
import { maximumRes } from '@/Config/dimensions'
import { Event } from '@/types/schema'
import { changeSelectedEvent } from '@/Store/Wizard'
import { useAppDispatch } from '@/Store'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { useFocusEffect } from '@react-navigation/native'

const EventContainer = () => {
  const { top } = useSafeAreaInsets()
  const wallet = useSelector(walletPublicKey)
  const { Gutters, Layout, Fonts, Images } = useTheme()
  const { data, refetch, isRefetching: isLoading } = useEvents()
  const dispatch = useAppDispatch()

  const selectEvent = (event: Event, eventAccountAddress: string) => {
    const serialized = {
      name: event.name,
      opened: event.opened,
      host: event.host.toBase58(),
      vault: event.vault.toBase58(),
      executor: event.executor.toBase58(),
      number_of_nft: event.numberOfNft.toNumber(),
      amount: event.amount.toNumber(),
      index: event.index.toNumber(),
      collection: event.collection?.toBase58(),
      frameUrl: event.frameUrl,
      eventAccountAddress,
    }
    dispatch(
      changeSelectedEvent({
        selectedEvent: serialized,
      }),
    )
    if (wallet === event.host.toBase58()) {
      Alert.alert(
        'We detected that you are owner of this event',
        'Please choose action below',
        [
          {
            text: 'Top-up NFTs',
            onPress: () =>
              navigate(AppRoutes.TOP_UP_NFTS, { eventAccountAddress }),
          },
          {
            text: 'Update event information',
            onPress: () =>
              navigate(AppRoutes.UPDATE_EVENT, { eventAccountAddress }),
          },
          {
            text: 'Capture & Mint',
            onPress: () => navigate(AppRoutes.CHOOSE_FRAME, serialized),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      )
      return
    }
    navigate(AppRoutes.CHOOSE_FRAME, serialized)
  }

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
        renderItem={({ item: _item, index }) => {
          const item = _item.account
          return (
            <TouchableOpacity
              onPress={() => {
                selectEvent(item, _item.publicKey.toBase58())
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
                  {item?.frameUrl && (
                    <Image
                      source={{ uri: item?.frameUrl }}
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
                        Host: {item?.host?.toBase58()}
                      </Text>
                      <Text style={[Fonts.regular, { fontSize: 14 }]}>
                        Remaining: {item?.numberOfNft?.toNumber()} NFTs
                      </Text>
                    </View>
                    <View
                      style={[
                        {
                          backgroundColor: '#edecf0',
                          paddingVertical: 4,
                          borderRadius: 24,
                          maxWidth: 128,
                        },
                        Layout.center,
                        Gutters.smallTMargin,
                      ]}
                    >
                      <Text style={[Fonts.bold, { fontSize: 16 }]}>
                        {item?.opened ? 'Opened' : 'Closed'}
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
        keyExtractor={item => item?.publicKey?.toBase58()}
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularVPadding,
          Layout.fullWidth,
          Layout.maxWidthTablet,
        ]}
      />
    </View>
  )
}

export default EventContainer
