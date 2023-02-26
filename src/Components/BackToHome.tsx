import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useAppDispatch } from '@/Store'
import { changeFrame, changePhoto, changeSelectedEvent } from '@/Store/Wizard'
import { AppRoutes, navigateAndSimpleReset } from '@/Navigators/utils'

const BackToHome = () => {
  const dispatch = useAppDispatch()
  const { Layout, Fonts, Gutters } = useTheme()

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(changePhoto({ selectedPhoto: undefined }))
        dispatch(changeFrame({ selectedFrame: undefined }))
        dispatch(changeSelectedEvent({ selectedEvent: undefined }))
        navigateAndSimpleReset(AppRoutes.HOME)
      }}
      style={[Gutters.smallRMargin]}
    >
      <Text style={[Fonts.bold, { fontSize: 18 }]}>Done</Text>
    </TouchableOpacity>
  )
}

export default BackToHome
