import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/Store'
import { EventType } from '@/types/schema'

export enum WizardSteps {
  CHOOSE_FRAME = 'CHOOSE_FRAME',
  CAPTURE_PHOTO = 'CAPTURE_PHOTO',
}

export type WizardState = {
  step: WizardSteps
  selectedPhoto?: string
  selectedFrame?: string
  selectedEvent?: EventType
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
    selectedEvent: undefined,
  } as WizardState,
  reducers: {
    changeWizardStep: (state, { payload: { step } }: WizardPayload) => {
      if (typeof step !== 'undefined') {
        state.step = step
      }
    },
    changeFrame: (state, { payload: { selectedFrame } }: WizardPayload) => {
      state.selectedFrame = selectedFrame
    },
    changePhoto: (state, { payload: { selectedPhoto } }: WizardPayload) => {
      state.selectedPhoto = selectedPhoto
    },
    changeSelectedEvent: (
      state,
      { payload: { selectedEvent } }: WizardPayload,
    ) => {
      state.selectedEvent = selectedEvent
    },
  },
})

export const {
  changeWizardStep,
  changeSelectedEvent,
  changeFrame,
  changePhoto,
} = slice.actions

export const currentStep = (state: RootState) => state.wizard.step
export const selectedPhoto = (state: RootState) => state.wizard.selectedPhoto
export const selectedFrame = (state: RootState) => state.wizard.selectedFrame
export const selectedEvent = (state: RootState) => state.wizard.selectedEvent

export default slice.reducer
