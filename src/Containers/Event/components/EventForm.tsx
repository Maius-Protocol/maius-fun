import { Text, TextInput, View } from 'react-native'
import { Controller } from 'react-hook-form'
import { launchImageLibrary } from 'react-native-image-picker'
import SelectedFrameImage from '@/Containers/ChooseFrame/components/SelectedFrameImage'
import { Button } from '@ant-design/react-native'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { useTheme } from '@/Hooks'
import { UseFormReturn } from 'react-hook-form/dist/types'

const EventForm = ({ control, formState: { errors } }: UseFormReturn<any>) => {
  const { Gutters, Layout, Fonts } = useTheme()

  const textStyle = [Fonts.bold, { fontSize: 16 }, Gutters.smallBMargin]
  return (
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
        {errors.name && <Text style={[Fonts.italic]}>This is required.</Text>}
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
                    style={[{ width: 200, height: 200 }, Gutters.smallBMargin]}
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
                  <Text style={[Fonts.textWhite, Fonts.textCenter, Fonts.bold]}>
                    Choose photo
                  </Text>
                </Button>
              </>
            )
          }}
          name="frame"
        />
        {errors.frame && <Text style={[Fonts.italic]}>This is required.</Text>}
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
  )
}

export default EventForm
