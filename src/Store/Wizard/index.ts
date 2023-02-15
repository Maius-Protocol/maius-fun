import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/Store'

export enum WizardSteps {
  CHOOSE_FRAME = 'CHOOSE_FRAME',
  CAPTURE_PHOTO = 'CAPTURE_PHOTO',
}

export type WizardState = {
  step: WizardSteps
  selectedPhoto?: string
  selectedFrame?: string
}

type WizardPayload = {
  payload: Partial<WizardState>
}

const slice = createSlice({
  name: 'wizard',
  initialState: {
    step: WizardSteps.CHOOSE_FRAME,
    selectedFrame: undefined,
    selectedPhoto: undefined,
  } as WizardState,
  reducers: {
    changeWizardStep: (state, { payload: { step } }: WizardPayload) => {
      if (typeof step !== 'undefined') {
        state.step = step
      }
    },
    changeFrame: (state, { payload: { selectedFrame } }: WizardPayload) => {
      if (typeof selectedFrame !== 'undefined') {
        state.selectedFrame = selectedFrame
      }
    },
  },
})

export const { changeWizardStep, changeFrame } = slice.actions

export const currentStep = (state: RootState) => state.wizard.step
export const selectedPhoto = (state: RootState) => state.wizard.selectedPhoto
export const selectedFrame = (state: RootState) => state.wizard.selectedFrame

export default slice.reducer
