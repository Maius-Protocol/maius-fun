import React, { useState } from 'react'
import { View } from '@ant-design/react-native'
import WizardSteps from '@/Config/WizardSteps'
import ChooseFrameContainer from '@/Containers/ChooseFrame/ChooseFrameContainer'

const WizardContainer = () => {
  const [currentStep, setCurrentStep] = useState<WizardSteps>(
    WizardSteps.CHOOSE_FRAME,
  )
  return (
    <View>
      {currentStep === WizardSteps.CHOOSE_FRAME && <ChooseFrameContainer />}
    </View>
  )
}

export default WizardContainer
