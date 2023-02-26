import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import useEvent from '@/Services/modules/events/useEvent'
import { useSelector } from 'react-redux'
import { selectedEvent } from '@/Store/Wizard'

const CurrentNftsRemaining = () => {
  const _selectedEvent = useSelector(selectedEvent)
  const { Layout, Fonts, Gutters } = useTheme()
  const { data: eventData, isRefetching } = useEvent(
    _selectedEvent?.eventAccountAddress!,
    {
      refetchInterval: 15000,
    },
  )

  return (
    <View style={[Layout.row]}>
      {!isRefetching && (
        <Text style={[Fonts.textCenter, Fonts.bold, { fontSize: 18 }]}>
          {eventData?.numberOfNft?.toNumber()}
        </Text>
      )}
      {isRefetching && <ActivityIndicator style={[Gutters.smallRMargin]} />}
      <Text style={[Fonts.textCenter, Fonts.bold, { fontSize: 18 }]}>
        {' '}
        NFTs left!
      </Text>
    </View>
  )
}

export default CurrentNftsRemaining
