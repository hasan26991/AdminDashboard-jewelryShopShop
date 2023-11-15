import { TextField } from '@mui/material'
import { typedMemo } from 'utils/tsHelpers'
import { useTextInput, TextInputProps } from './useTextInput'

const TextInput = <T,>(props: TextInputProps<T>) => {
  const {
    rootId,
    mask,
    inputHelpers,
    placeholder,
    error,
    hasError,
    showRemaining,
    remainingText,
    inputMaskRef,
    ...textFieldProps
  } = useTextInput(props)

  return (
    <TextField
      {...inputHelpers}
      {...textFieldProps}
      error={hasError}
      helperText={
        hasError ? error : showRemaining ? remainingText : textFieldProps.helperText || ''
      }
      placeholder={placeholder}
      autoFocus={false}
      inputProps={{ ...inputHelpers.inputProps, ...textFieldProps.inputProps }}
      variant='outlined'
      minRows={3}
      classes={{ root: rootId }}
      inputRef={mask ? inputMaskRef : undefined}
    />
  )
}

export default typedMemo(TextInput)
