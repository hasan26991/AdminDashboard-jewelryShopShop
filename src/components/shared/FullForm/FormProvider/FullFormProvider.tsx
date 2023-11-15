/* eslint-disable @typescript-eslint/no-explicit-any */
import FormWrapper from '../FormWrapper/FormWrapper'
import { FullFormContext } from '../context/FullFormContext'
import { FullFormProviderProps, useFullFormProvider } from './useFullFormProvider'

const FullFormProvider = <T,>(props: FullFormProviderProps<T>) => {
  const { children, contextValue } = useFullFormProvider(props)

  return (
    <FullFormContext.Provider value={contextValue}>
      <FormWrapper>{children as any}</FormWrapper>
    </FullFormContext.Provider>
  )
}

export default FullFormProvider
