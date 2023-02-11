import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/Store'

export enum WizardSteps {
  CHOOSE_FRAME = 'CHOOSE_FRAME',
  CAPTURE_PHOTO = 'CAPTURE_PHOTO',
}

const slice = createSlice({
  name: 'wizard',
  initialState: { step: WizardSteps.CHOOSE_FRAME } as WizardState,
  reducers: {
    changeWizardStep: (state, { payload: { step } }: WizardPayload) => {
      if (typeof step !== 'undefined') {
        state.step = step
      }
    },
  },
})

export const { changeWizardStep } = slice.actions

export const currentStep = (state: RootState) => state.wizard.step

export default slice.reducer

export type WizardState = {
  step: WizardSteps
}

type WizardPayload = {
  payload: {
    step: WizardSteps
  }
}
