import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Controller, useForm } from 'react-hook-form'
import Divider from '@/Components/Divider'
import { useSelector } from 'react-redux'
import { walletPublicKey } from '@/Store/Wallet'
import { Button } from '@ant-design/react-native'
import { Picker } from '@react-native-picker/picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { launchImageLibrary } from 'react-native-image-picker'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import useUploadFrame from '@/Services/mutations/useUploadFrame'
import { navigationRef } from '@/Navigators/utils'
import useCreateEvent from '@/Services/modules/events/useCreateEvent'
import useSendTransaction from '@/Services/mutations/useSendTransaction'
import useIdentifier from '@/Services/modules/identifier/useIdentifier'
import useCreateIdentifier from '@/Services/modules/identifier/useCreateIdentifier'
import useEvents from '@/Services/modules/events/useEvents'
import { Transaction } from '@solana/web3.js'
import EventForm from '@/Containers/Event/components/EventForm'

const AddNewEventContainer = () => {
  const { Gutters, Layout, Fonts } = useTheme()
  const wallet = useSelector(walletPublicKey)
  const { bottom } = useSafeAreaInsets()
  const {
    data: identifier,
    refetch: refetchIdentifier,
    isRefetching: isLoadingIdentifier,
  } = useIdentifier()

  const { mutateAsync: createIdentifier, isLoading: isCreatingIdentifier } =
    useCreateIdentifier()
  const { mutateAsync: uploadFrame, isLoading: isUploadFrame } =
    useUploadFrame()
  const { mutateAsync: createEvent, isLoading: isCreateEvent } =
    useCreateEvent()
  const { mutateAsync: sendInstruction, isLoading: isSendingInstruction } =
    useSendTransaction()
  const eventCount = identifier?.count?.toNumber() || 0
  const formProps = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      status: 'OPENED',
      name: undefined,
      frame: undefined,
      host_pk: wallet,
    },
  })
  const {
    handleSubmit,
    formState: { errors },
  } = formProps

  const isLoading =
    isUploadFrame ||
    isCreateEvent ||
    isLoadingIdentifier ||
    isSendingInstruction ||
    isCreatingIdentifier

  const enabled = errors.name === undefined && errors.frame === undefined
  const onSubmit = async (data: any) => {
    let instructions: Transaction[] = []
    const { frame, status, name, description } = data
    const _frameUrl = await uploadFrame({ frame })
    const frameUrl = _frameUrl?.data?.data?.url
    if (!identifier) {
      const { transaction: identifierTransaction } = await createIdentifier()
      instructions = [identifierTransaction]
    }
    const { transaction: eventTransaction } = await createEvent({
      name: name,
      opened: status === 'OPENED',
      frame_url: frameUrl,
      count: eventCount,
      description: description,
    })
    instructions = [...instructions, eventTransaction]
    await sendInstruction(instructions)
    refetchIdentifier()
    navigationRef.goBack()
  }

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
            Add New Event
          </Text>
        </View>
        <Divider />
        <EventForm {...formProps} />
      </ScrollView>
      <View
        style={[
          Gutters.regularHPadding,
          { marginBottom: bottom + 32 },
          Gutters.smallTMargin,
        ]}
      >
        <Button
          loading={isLoading}
          disabled={!enabled}
          onPress={handleSubmit(onSubmit)}
          type="primary"
        >
          <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
            Submit
          </Text>
        </Button>
      </View>
    </View>
  )
}
export default AddNewEventContainer
