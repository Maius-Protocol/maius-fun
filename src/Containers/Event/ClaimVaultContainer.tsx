import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Divider from '@/Components/Divider'
import { useTheme } from '@/Hooks'
import useClaimVault from '@/Services/modules/events/useClaimVault'
import { ActivityIndicator } from '@ant-design/react-native'
import { navigationRef } from '@/Navigators/utils'
import useSendTransaction from '@/Services/mutations/useSendTransaction'
import { useSelector } from 'react-redux'
import { selectedEvent } from '@/Store/Wizard'

const ClaimVaultContainer = () => {
  const { Gutters, Layout, Fonts, Colors } = useTheme()
  const _selectedEvent = useSelector(selectedEvent)
  const eventAccountAddress = _selectedEvent?.eventAccountAddress
  const vaultAddress = _selectedEvent?.vault
  const { mutateAsync: claimInstruction } = useClaimVault(
    eventAccountAddress!,
    vaultAddress!,
  )
  const { mutateAsync: sendTransaction } = useSendTransaction()

  const submit = async () => {
    const { transaction } = await claimInstruction()
    await sendTransaction([transaction!])
    navigationRef.goBack()
  }

  useEffect(() => {
    submit()
  }, [])

  return (
    <View style={[Layout.fill]}>
      <View style={[Gutters.regularHPadding, Gutters.regularTPadding]}>
        <View>
          <Text style={[Fonts.textLarge, Fonts.bold, Fonts.textBlack]}>
            Claiming vault...
          </Text>
        </View>
        <Divider />

        <View style={[Gutters.smallTMargin]}>
          <ActivityIndicator />
        </View>
      </View>
    </View>
  )
}

export default ClaimVaultContainer
