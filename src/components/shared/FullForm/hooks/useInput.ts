import { useEffect, useMemo } from 'react'
import { TouchedType } from '../context/FullFormContext'
import { useFullForm } from './useFullForm'

interface UseInputProps<T> {
  id?: keyof T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defInitialValue: any
  maxLength?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInput = <T, K = any>(props: UseInputProps<T>) => {
  const { id, defInitialValue, maxLength } = props
  const { setInputValue, setInputTouched, setFormErrors, size, formState, readonly } =
    useFullForm<T>()
  const { values, errors, loading } = formState

  const value = useMemo(() => {
    if (!id) return defInitialValue
    if (values[id] === undefined) return defInitialValue
    if (values[id] === null) return defInitialValue

    return values[id]
  }, [id, values, defInitialValue])

  const error = id ? errors[id] : ''
  const hasError = id ? !!errors[id] : false

  const rootId = `root-${String(id)}`

  const inputHelpers = useMemo(
    () => ({
      size: size || 'small',
      inputProps: {
        readOnly: readonly,
      },
      disabled: !id ? true : loading,
      value: (value === undefined ? defInitialValue : value) as K,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange(eve: { target: { value: any } }) {
        if (id) setInputValue({ id, value: eve.target.value })
      },
      onBlur() {
        if (id) setInputTouched({ [id]: true } as TouchedType<T>)
      },
    }),
    [size, value, id, loading, readonly, defInitialValue, setInputTouched, setInputValue]
  )

  const valLength = useMemo(() => {
    if (typeof value === 'string') return value.length
    return 0
  }, [value])

  useEffect(() => {
    if (!maxLength || !id) return
    if (valLength > maxLength) {
      const maxLengthError = { [id]: `Value must be length < ${maxLength}` } as Partial<
        Record<keyof T, string>
      >
      setFormErrors(maxLengthError)
    }
  }, [valLength, maxLength, id, setFormErrors])

  return { rootId, error, hasError, inputHelpers }
}
