import { CSSProperties, useCallback, useEffect, useRef } from 'react'
import { debounce } from 'utils/misc'
import {
  SetErrorsPayload,
  SetTouchedPayload,
  SetValuePayload,
  SetValuesPayload,
} from '../actions/formActions'
import { useFullForm } from '../hooks/useFullForm'

export type EnhancedChildren<T> =
  | ((helpers: FormHelpers<T>) => JSX.Element)
  | JSX.Element
  | JSX.Element[]

export interface FormHelpers<T> {
  isDisabled: boolean
  values: T
  setValues: (value: SetValuesPayload<T>, notModified?: boolean) => void
  setErrors: (errors: SetErrorsPayload<T>) => void
  setInputTouched: (inputTouched: SetTouchedPayload<T>) => void
  setInputValue: (inputValue: SetValuePayload<T>) => void
  resetForm: () => void
  clear: () => void
  hasBeenModified: () => boolean
  submitForm: () => boolean
  isValid: boolean
}

export interface FormWrapperProps<T> {
  children: EnhancedChildren<T>
}

export const useFormWrapper = <T>(props: FormWrapperProps<T>) => {
  const debounceRef = useRef<NodeJS.Timer | null>(null)
  const prevValues = useRef<T | null>(null)
  // const firstValidationRef = useRef(false)

  const { children } = props
  const {
    formState,
    debounceTime,
    containerStyle,
    flexContainer,
    helpers,
    // handleValidate,
    handleSubmit,
    onValuesChanged,
  } = useFullForm<T>()
  const { values } = formState

  const finalContainerStyle: CSSProperties = flexContainer
    ? { flex: 1, display: 'flex', flexDirection: 'column' }
    : containerStyle || {}

  const memoChildren = useCallback(() => {
    if (typeof children === 'function') {
      return children(helpers)
    }

    return children
  }, [children, helpers])

  useEffect(() => {
    const areEqual = JSON.stringify(prevValues.current || {}) === JSON.stringify(values)
    if (onValuesChanged && !areEqual) {
      prevValues.current = values
      debounceRef.current = debounce(
        debounceRef.current,
        () => onValuesChanged(values),
        debounceTime || 1000
      )
    }
  }, [values, onValuesChanged, debounceTime])

  // useEffect(() => {
  //   // validate to show the red outline
  //   if (!firstValidationRef.current) {
  //     handleValidate()
  //     firstValidationRef.current = true
  //   }
  // }, [handleValidate])

  return {
    ...props,
    containerStyle: finalContainerStyle,
    handleSubmit,
    children: memoChildren,
  }
}
