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
import { useMutation } from 'react-query'
import { Event } from '@/models'
import { DataStore } from 'aws-amplify'
import { navigationRef } from '@/Navigators/utils'

const AddNewEventContainer = () => {
  const { Gutters, Layout, Fonts } = useTheme()
  const wallet = useSelector(walletPublicKey)
  const { bottom } = useSafeAreaInsets()
  const { mutateAsync: uploadFrame, isLoading: isUploadFrame } =
    useUploadFrame()
  const { mutateAsync: createEvent, isLoading: isCreateEvent } = useMutation(
    async (params: any) => {
      return await DataStore.save(
        new Event({
          ...params,
        }),
      )
    },
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      status: 'OPENED',
      name: undefined,
      frame: undefined,
      host_pk: wallet,
    },
  })

  const enabled = errors.name === undefined && errors.frame === undefined
  const isLoading = isUploadFrame || isCreateEvent

  const onSubmit = async (data: any) => {
    const { frame, host_pk, status, name } = data
    const frameUrl = await uploadFrame({ frame })
    await createEvent({
      host_pk,
      status,
      name,
      frame_url: frameUrl?.data?.data?.url,
    })
    navigationRef.goBack()
  }

  const textStyle = [Fonts.bold, { fontSize: 16 }, Gutters.smallBMargin]
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

        <View style={[Gutters.regularTMargin]}>
          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Event Name</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Type your event name here"
                  style={[...textStyle, Fonts.regular]}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={[Fonts.italic]}>This is required.</Text>
            )}
          </View>
          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Frame</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => {
                const changeImage = async () => {
                  const result = await launchImageLibrary({
                    mediaType: 'photo',
                  })
                  const { assets } = result
                  const asset = assets?.[0]
                  if (asset) {
                    onChange(asset.uri)
                  }
                }
                return (
                  <>
                    {value && (
                      <View
                        style={[
                          { width: 200, height: 200 },
                          Gutters.smallBMargin,
                        ]}
                      >
                        <SelectedFrameImage
                          imageUri={undefined}
                          frameUri={value}
                          onChange={changeImage}
                        />
                      </View>
                    )}
                    <Button
                      type="warning"
                      onPress={changeImage}
                      style={[Gutters.smallBMargin]}
                    >
                      <Text
                        style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}
                      >
                        Choose photo
                      </Text>
                    </Button>
                  </>
                )
              }}
              name="frame"
            />
            {errors.frame && (
              <Text style={[Fonts.italic]}>This is required.</Text>
            )}
          </View>
          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Status</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onBlur={onBlur}
                  onValueChange={onChange}
                  mode="dialog"
                >
                  <Picker.Item label="Open" value={'OPENED'} />
                  <Picker.Item label="Closed" value={'CLOSED'} />
                </Picker>
              )}
              name="status"
            />
          </View>
          <View style={[Gutters.regularBMargin]}>
            <Text style={textStyle}>Host</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  editable={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[...textStyle, Fonts.regular]}
                />
              )}
              name="host_pk"
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          Gutters.regularHPadding,
          { marginBottom: bottom },
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
