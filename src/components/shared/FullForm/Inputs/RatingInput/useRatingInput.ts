import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
import { useInput } from 'components/shared/FullForm/hooks/useInput'

export interface RatingInputProps<T> {
  id?: keyof T
  required?: boolean
}

export const useRatingInput = <T>(props: RatingInputProps<T>) => {
  const { id } = props

  const { setInputValue } = useFullForm<T>()
  const { inputHelpers, error, hasError } = useInput<T>({ id, defInitialValue: null })

  const value: number = inputHelpers.value || 0
  const onChange = (eve: unknown, newValue: number | null) => {
    if (!id) return

    setInputValue({ id, value: newValue })
  }

  return { ...props, inputHelpers: { value, onChange }, error, hasError }
}
