import React, { useState } from 'react'
import { View } from '@ant-design/react-native'
import ChooseFrameContainer from '@/Containers/ChooseFrame/ChooseFrameContainer'
import { useSelector } from 'react-redux'
import { currentStep, WizardSteps } from '@/Store/Wizard'

const WizardContainer = () => {
  const step = useSelector(currentStep)

  return (
    <View>{step === WizardSteps.CHOOSE_FRAME && <ChooseFrameContainer />}</View>
  )
}

export default WizardContainer
