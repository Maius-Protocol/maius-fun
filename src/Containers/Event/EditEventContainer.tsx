import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Divider from '@/Components/Divider'
import { useSelector } from 'react-redux'
import { selectedEvent } from '@/Store/Wizard'
import useEvent from '@/Services/modules/events/useEvent'
import { ActivityIndicator, Button } from '@ant-design/react-native'
import EventForm from '@/Containers/Event/components/EventForm'
import { useForm } from 'react-hook-form'
import { walletPublicKey } from '@/Store/Wallet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { navigationRef } from '@/Navigators/utils'
import useUploadFrame from '@/Services/mutations/useUploadFrame'
import useSendTransaction from '@/Services/mutations/useSendTransaction'
import useUpdateEvent from '@/Services/modules/events/useUpdateEvent'

const EditEventContainer = () => {
  const _selectedEvent = useSelector(selectedEvent)
  const wallet = useSelector(walletPublicKey)
  const { bottom } = useSafeAreaInsets()
  const eventAccountAddress = _selectedEvent?.eventAccountAddress
  const vaultAddress = _selectedEvent?.vault
  const { Gutters, Layout, Fonts } = useTheme()
  const {
    data,
    isLoading: isLoadingEvent,
    refetch,
  } = useEvent(eventAccountAddress!)

  const { mutateAsync: updateEvent, isLoading: isUpdatingEvent } =
    useUpdateEvent(eventAccountAddress!, vaultAddress!)
  const { mutateAsync: uploadFrame, isLoading: isUploadFrame } =
    useUploadFrame()
  const { mutateAsync: sendInstruction, isLoading: isSendingInstruction } =
    useSendTransaction()
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
    reset,
    formState: { errors },
  } = formProps

  const isLoading = isUploadFrame || isUpdatingEvent || isSendingInstruction

  const onSubmit = async (data: any) => {
    const { frame, status, name } = data
    let frameUrl = data?.frameUrl
    if (frame !== data?.frameUrl) {
      const _frameUrl = await uploadFrame({ frame })
      frameUrl = _frameUrl?.data?.data?.url
    }
    const { transaction: eventTransaction } = await updateEvent({
      name: name,
      opened: status === 'OPENED',
      frameUrl: frameUrl,
    })
    const instructions = [eventTransaction]
    await sendInstruction(instructions)
    refetch()
    navigationRef.goBack()
  }

  const enabled = errors.name === undefined && errors.frame === undefined

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name!,
        frame: data?.frameUrl!,
        status: data?.opened ? 'OPENED' : 'CLOSED',
      })
    }
  }, [data])

  return (
    <View style={[Layout.fill]}>
      <ScrollView
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularTPadding,
        ]}
      >
        <View>
          <Text
            numberOfLines={1}
            style={[Fonts.textLarge, Fonts.bold, Fonts.textBlack]}
          >
            Update Event
          </Text>
        </View>
        <Divider />

        {isLoadingEvent && (
          <View style={[Gutters.smallTMargin]}>
            <ActivityIndicator />
          </View>
        )}
        {!isLoadingEvent && <EventForm {...formProps} />}
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

export default EditEventContainer
