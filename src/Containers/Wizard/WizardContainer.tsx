import React from 'react'
import { View } from '@ant-design/react-native'
import ChooseFrameContainer from '@/Containers/ChooseFrame/ChooseFrameContainer'
import { useSelector } from 'react-redux'
import { currentStep, WizardSteps } from '@/Store/Wizard'
import CapturePhotoContainer from '@/Containers/CapturePhoto/CapturePhotoContainer'

const WizardContainer = () => {
  const step = useSelector(currentStep)

  return (
    <View>
      {step === WizardSteps.CHOOSE_FRAME && <ChooseFrameContainer />}
      {step === WizardSteps.CAPTURE_PHOTO && <CapturePhotoContainer />}
    </View>
  )
}

export default WizardContainer
