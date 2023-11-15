// Cspell:ignore vals
import { useCallback, useImperativeHandle, useMemo } from 'react'
import {
  resetForm as resetFormAction,
  clearForm,
  setErrors,
  SetErrorsPayload,
  setTouched,
  SetTouchedPayload,
  setValue,
  SetValuePayload,
  setValues,
  SetValuesPayload,
  setHasBeenModified as setModified,
} from '../actions/formActions'
import { useFullFormCtx } from '../context/FullFormContext'
import { FormHelpers } from '../FormWrapper/useFormWrapper'

export const useFullForm = <T>() => {
  const ctx = useFullFormCtx<T>()
  if (!ctx) throw Error('useFullForm must be called inside form provider')
  const { contextReducer, providerProps } = ctx
  const { formRef, onSubmit, validate } = providerProps
  const [formState, formDispatch] = contextReducer
  const { values, loading, errors } = formState

  const setFormErrors = useCallback(
    (formErrors: SetErrorsPayload<T>) => {
      formDispatch(setErrors(formErrors))
    },
    [formDispatch]
  )

  const handleValidate = useCallback(
    (vals?: Partial<T>) => {
      let validated = true
      if (!validate) return validated

      const validation = validate(vals || values, {})
      validated = Object.keys(validation || {}).length === 0
      setFormErrors(validation)

      return validated
    },
    [values, validate, setFormErrors]
  )
  const setFormValues = useCallback(
    (values: SetValuesPayload<T>, notModified?: boolean) => {
      formDispatch(setValues(values))
      if (notModified !== undefined) {
        setTimeout(() => {
          formDispatch(setModified(notModified))
          handleValidate(values)
        }, 500)
      }
    },
    [formDispatch, handleValidate]
  )

  const setInputValue = useCallback(
    (value: SetValuePayload<T>) => {
      formDispatch(setValue<T>()(value))
    },
    [formDispatch]
  )

  const setInputTouched = useCallback(
    (inputTouched: SetTouchedPayload<T>) => {
      formDispatch(setTouched(inputTouched))
    },
    [formDispatch]
  )

  const resetForm = useCallback(() => {
    formDispatch(resetFormAction())
  }, [formDispatch])

  const clear = useCallback(() => {
    formDispatch(clearForm())
  }, [formDispatch])

  const setHasBeenModified = useCallback(
    (next: boolean) => {
      formDispatch(setModified(next))
    },
    [formDispatch]
  )

  const handleSubmit = useCallback(
    (ev?: React.FormEvent) => {
      ev?.preventDefault()
      const validated = handleValidate()
      if (onSubmit && validated) {
        onSubmit(values)
      }
      return validated
    },
    [values, onSubmit, handleValidate]
  )

  const submitForm = useCallback(() => {
    formDispatch(setModified(false))
    return handleSubmit()
  }, [formDispatch, handleSubmit])

  const helpers = useMemo(
    (): FormHelpers<T> => ({
      isDisabled: loading,
      values,
      setErrors: (errs) => {
        setFormErrors(errs)
      },
      setValues: (values, notModified) => {
        setFormValues(values, notModified)
      },
      setInputTouched,
      setInputValue,
      resetForm,
      clear,
      hasBeenModified: () => formState.hasBeenModified,
      submitForm,
      isValid: Object.keys(errors).length === 0,
    }),
    [
      loading,
      formState,
      values,
      clear,
      resetForm,
      setFormErrors,
      setInputTouched,
      setFormValues,
      setInputValue,
      submitForm,
      errors,
    ]
  )

  useImperativeHandle(formRef, () => helpers)

  return {
    ...providerProps,
    formState,
    helpers,
    setFormErrors,
    setFormValues,
    setInputTouched,
    setInputValue,
    setHasBeenModified,
    resetForm,
    clear,
    handleSubmit,
    handleValidate,
  }
}
