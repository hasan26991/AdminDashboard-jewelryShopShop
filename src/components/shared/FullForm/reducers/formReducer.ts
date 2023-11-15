import { createReducer } from '@reduxjs/toolkit'
import {
  clearForm,
  resetForm,
  setErrors,
  setHasBeenModified,
  setLoading,
  setTouched,
  setValue,
  setValues,
} from '../actions/formActions'
import { FullFormState } from '../context/FullFormContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initialFormState: FullFormState<any> = {
  loading: false,
  hasBeenModified: false,
  values: {},
  errors: {},
  touched: {},
}

export const formReducer = createReducer(initialFormState, (builder) => {
  builder
    .addCase(setValue(), (state, action) => {
      if (state.errors[action.payload.id] !== undefined) {
        delete state.errors[action.payload.id]
      }
      state.values[action.payload.id] = action.payload.value
      state.hasBeenModified = true
    })
    .addCase(setValues, (state, action) => {
      state.hasBeenModified = true
      state.values = { ...state.values, ...action.payload }
    })
    .addCase(setErrors, (state, action) => {
      state.errors = action.payload
    })
    .addCase(setTouched, (state, action) => {
      state.touched = { ...state.touched, ...action.payload }
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload
    })
    .addCase(setHasBeenModified, (state, action) => {
      state.hasBeenModified = action.payload
    })
    .addCase(resetForm, () => initialFormState)
    .addCase(clearForm, (state) => {
      state.values = {}
      state.hasBeenModified = false
    })
})
