import { useEffect, useReducer, useRef } from 'react'
import { EnhancedChildren } from '../FormWrapper/useFormWrapper'
import { formReducer, initialFormState } from '../reducers/formReducer'
import { FullFormCtxState, FullFormProps } from '../context/FullFormContext'
import { debounce } from 'utils/misc'
import { setLoading } from '../actions/formActions'

export interface FullFormProviderProps<T> extends FullFormProps<T> {
  children: EnhancedChildren<T>
}

export const useFullFormProvider = <T>(props: FullFormProviderProps<T>) => {
  const { children, disabled, ...providerProps } = props

  const debounceRef = useRef<NodeJS.Timer | null>(null)

  const contextReducer = useReducer(formReducer, {
    ...initialFormState,
    values: providerProps.initialValues || {},
  })

  const contextValue: FullFormCtxState<T> = { contextReducer, providerProps }

  const [, dispatch] = contextReducer
  useEffect(() => {
    if (disabled) {
      dispatch(setLoading(disabled))
      return
    }

    debounceRef.current = debounce(
      debounceRef.current,
      () => {
        dispatch(setLoading(!!disabled))
      },
      1000
    )
  }, [disabled, dispatch])

  return { children, contextValue }
}
