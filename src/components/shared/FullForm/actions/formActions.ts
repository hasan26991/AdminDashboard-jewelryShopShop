import { createAction } from '@reduxjs/toolkit'
import { FormErrorsType, TouchedType } from '../context/FullFormContext'

const prefix = 'form/'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetValuePayload<T> = { id: keyof T; value: any }
export const setValue = <T>() => createAction<SetValuePayload<T>>(`${prefix}set-value`)

export type SetValuesPayload<T> = Partial<T>
export const setValues = createAction(
  `${prefix}set-values`,
  <T>(payload: SetValuesPayload<T>) => ({ payload })
)

export type SetErrorsPayload<T> = FormErrorsType<T>
export const setErrors = createAction(
  `${prefix}set-errors`,
  <T>(payload: SetErrorsPayload<T>) => ({ payload })
)

export type SetTouchedPayload<T> = TouchedType<T>
export const setTouched = createAction(
  `${prefix}set-touched`,
  <T>(payload: SetTouchedPayload<T>) => ({ payload })
)

export const resetForm = createAction(`${prefix}reset-form`)
export const clearForm = createAction(`${prefix}clear-form`)
export const setLoading = createAction<boolean>(`${prefix}loading-form`)
export const setHasBeenModified = createAction<boolean>(`${prefix}set-has-been-modified`)
