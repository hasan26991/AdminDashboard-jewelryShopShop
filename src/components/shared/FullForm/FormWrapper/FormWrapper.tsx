import { useFormWrapper, FormWrapperProps } from './useFormWrapper'
import { memo } from 'react'

const FormWrapper = <T,>(props: FormWrapperProps<T>) => {
  const { children, handleSubmit, containerStyle } = useFormWrapper(props)
  return (
    <form noValidate style={containerStyle} onSubmit={handleSubmit} autoComplete='off'>
      {children()}
    </form>
  )
}

export default memo(FormWrapper)
