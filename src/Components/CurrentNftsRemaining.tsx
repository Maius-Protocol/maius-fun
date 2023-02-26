import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import useEvent from '@/Services/modules/events/useEvent'
import { useSelector } from 'react-redux'
import { selectedEvent } from '@/Store/Wizard'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const CurrentNftsRemaining = () => {
  const _selectedEvent = useSelector(selectedEvent)
  const { Layout, Fonts, Gutters } = useTheme()
  const { data: eventData, isRefetching } = useEvent(
    _selectedEvent?.eventAccountAddress!,
    {
      refetchInterval: 30000,
    },
  )

  return (
    <View style={[Layout.row]}>
      {isRefetching && (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item width={100} height={24} borderRadius={2} />
        </SkeletonPlaceholder>
      )}
      {!isRefetching && (
        <Text style={[Fonts.textCenter, Fonts.bold, { fontSize: 18 }]}>
          {eventData?.numberOfNft?.toNumber()} NFTs left!
        </Text>
      )}
    </View>
  )
}

export default CurrentNftsRemaining
