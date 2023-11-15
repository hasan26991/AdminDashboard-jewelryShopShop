import React, { createContext, CSSProperties, Dispatch, useContext } from 'react'
import { FormHelpers } from '../FormWrapper/useFormWrapper'

export type FormErrorsType<T> = Partial<Record<keyof T, string>>
export type TouchedType<T> = Partial<Record<keyof T, boolean>>

export type ValidateFn<T> = (
  values: Partial<T>,
  errors: FormErrorsType<T>
) => FormErrorsType<T>

export type FullFormProps<T> = {
  initialValues?: Partial<T> | null
  debounceTime?: number
  containerStyle?: CSSProperties
  disabled?: boolean
  readonly?: boolean
  formRef?: React.Ref<FormHelpers<T>>
  onSubmit?: (values: T) => void
  onValuesChanged?: (values: T) => void
  validate?: ValidateFn<T>
  flexContainer?: boolean
  size?: 'small' | 'medium'
}

export interface FullFormState<T> {
  loading: boolean
  values: T
  errors: FormErrorsType<T>
  touched: TouchedType<T>
  hasBeenModified: boolean
}

export type FullFormCtxState<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextReducer: [FullFormState<T>, Dispatch<any>]
  providerProps: FullFormProps<T>
} | null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FullFormContext = createContext<FullFormCtxState<any>>(null)
export const useFullFormCtx = <T>() => useContext<FullFormCtxState<T>>(FullFormContext)
