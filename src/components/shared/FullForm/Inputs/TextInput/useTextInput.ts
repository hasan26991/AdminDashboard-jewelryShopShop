import { TextFieldProps } from '@mui/material'
import { useInput } from 'components/shared/FullForm/hooks/useInput'
import { useMemo, useRef } from 'react'
import { debounce } from 'utils/misc'
import { firstToUpper } from 'utils/stringHelpers'
import { useIMask } from 'react-imask'

export interface TextInputProps<T> extends Omit<TextFieldProps, 'id'> {
  id?: keyof T
  noLabel?: boolean
  mask?: string
  maxLength?: number
  onChangeText?: (debouncedText: string) => void
  onPreChange?: (val: string | number) => boolean
}

export const useTextInput = <T>(props: TextInputProps<T>) => {
  const { id, mask, onChangeText, placeholder, noLabel, onPreChange, ...rest } = props
  const timeoutRef = useRef<NodeJS.Timer | null>(null)
  const { label, maxLength } = rest
  const { rootId, inputHelpers, hasError, error } = useInput<T>({
    id,
    defInitialValue: '',
    maxLength,
  })
  const { onChange } = inputHelpers

  const { ref: inputMaskRef } = useIMask(
    { mask },
    {
      onAccept(value) {
        onChange({ target: { value } })
      },
    }
  )

  const finalOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (onPreChange) {
      const haveToReturn = onPreChange(ev.target.value)
      if (!haveToReturn) return
    }
    if (onChange) onChange(ev)
    if (onChangeText) {
      timeoutRef.current = debounce(
        timeoutRef.current,
        () => onChangeText(ev.target.value),
        1000
      )
    }
  }
  const finalPlaceholder = (label as string) || placeholder
  const finalLabel = useMemo(() => {
    if (noLabel) return ''
    const labelOrId = label || firstToUpper(id)

    return labelOrId
  }, [noLabel, label, id])

  const remaining = useMemo(() => {
    const valLength = inputHelpers.value.length
    const finalLength = maxLength || -1
    const tenLeft = finalLength - 5

    const showRemaining = finalLength > 0 && valLength > tenLeft
    const remainingText = `${valLength} of ${maxLength} characters`

    return { showRemaining, remainingText }
  }, [inputHelpers, maxLength])

  return {
    ...rest,
    ...remaining,
    mask,
    rootId,
    inputHelpers: { ...inputHelpers, value: inputHelpers.value || '' },
    placeholder: finalPlaceholder,
    label: finalLabel,
    hasError,
    error,
    inputMaskRef,
    onChange: finalOnChange,
  }
}
