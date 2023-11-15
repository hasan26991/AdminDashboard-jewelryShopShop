// import { TextFieldProps } from '@mui/material'
// import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
// import { useInput } from 'components/shared/FullForm/hooks/useInput'
// import { useMemo } from 'react'
// import { NumberFormatProps, NumberFormatValues } from 'react-number-format'
// import { firstToUpper } from 'utils/stringHelpers'

// export interface NumericTextInputProps<T>
//   extends Omit<NumberFormatProps & TextFieldProps, 'id' | 'ref'> {
//   id?: keyof T
//   useMaskValue?: boolean
//   parseValue?: (val: string | number) => string | number
// }

// export const useNumericTextInput = <T>(props: NumericTextInputProps<T>) => {
//   const { id, useMaskValue, parseValue, ...rest } = props
//   const { label, placeholder } = rest
//   const { rootId, inputHelpers, hasError, error } = useInput({ id, defInitialValue: '' })

//   const { onChange, value, ...finalInputHelpers } = inputHelpers
//   const finalPlaceholder = (label as string) || placeholder

//   const finalLabel = label || firstToUpper(id)
//   const { setInputValue } = useFullForm<T>()

//   const finalValue = useMemo(() => {
//     if (parseValue) return parseValue(value)
//     return value
//   }, [value, parseValue])

//   const changeValue = (numberValue: NumberFormatValues) => {
//     const { floatValue, formattedValue } = numberValue
//     if (id) setInputValue({ id, value: useMaskValue ? formattedValue : floatValue })
//   }

//   return {
//     rootId,
//     inputHelpers: finalInputHelpers,
//     label: finalLabel,
//     placeholder: finalPlaceholder,
//     hasError: hasError || props.error,
//     error,
//     value: finalValue,
//     ...rest,
//     changeValue,
//   }
// }
