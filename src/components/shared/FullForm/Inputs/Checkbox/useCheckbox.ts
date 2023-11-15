import { FormControlLabelProps, CheckboxProps as MuiCheckboxProps } from '@mui/material'
import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
import { useInput } from 'components/shared/FullForm/hooks/useInput'

export type OnValueChangeFunc<T> = (value: boolean, values: T) => T
export interface CheckboxProps<T>
  extends Omit<MuiCheckboxProps, 'id'>,
    Pick<FormControlLabelProps, 'labelPlacement'> {
  id: keyof T
  label?: string
  onValueChanged?: OnValueChangeFunc<T>
}

export const useCheckbox = <T>(props: CheckboxProps<T>) => {
  const { id, onValueChanged, ...rest } = props

  const { setFormValues, setInputValue, readonly, formState } = useFullForm<T>()
  const { values } = formState
  const { rootId, inputHelpers, hasError, error } = useInput({ id, defInitialValue: false })

  const checked = inputHelpers.value === '' ? false : Boolean(inputHelpers.value)
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    if (readonly) return

    setInputValue({ id, value })
    if (onValueChanged) {
      const finalValues = onValueChanged(value, values)
      setFormValues(finalValues)
    }
  }

  return {
    rootId,
    inputHelpers: { ...inputHelpers, checked, onChange },
    hasError,
    error,
    id,
    ...rest,
  }
}
