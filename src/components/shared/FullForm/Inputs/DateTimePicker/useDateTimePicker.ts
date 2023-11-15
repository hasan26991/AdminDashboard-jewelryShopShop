// import {
//   DesktopTimePicker,
//   DesktopTimePickerProps,
//   DesktopDatePicker,
//   DesktopDatePickerProps,
//   DesktopDateTimePicker,
//   DesktopDateTimePickerProps,
// } from '@mui/x-date-pickers'
// import { createTheme, TextField, TextFieldProps } from '@mui/material'
// import { DateTime } from 'luxon'
// import { createElement, useMemo } from 'react'

// import { useInput } from 'components/shared/FullForm/hooks/useInput'
// import { firstToUpper } from 'utils/stringHelpers'
// import brandInputs from 'themes/brandInputs'
// import { brandPalette } from 'themes/brandPalette'
// import { brandDarkPalette } from 'themes/brandDarkPalette'
// import darkTheme from 'themes/darkTheme'
// import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
// import { brandTypography } from 'themes/brandTypography'
// import { useUserPreferencesApi } from 'hooks/api/useUserPreferencesApi'

// type ExcludeCommon = 'onChange' | 'value' | 'renderInput'
// type Dependant =
//   | ({ onlyTime: true; dateTime: false } & Omit<
//       DesktopTimePickerProps<string, DateTime>,
//       ExcludeCommon
//     >)
//   | ({ onlyTime?: false; dateTime: true } & Omit<
//       DesktopDateTimePickerProps<string, DateTime>,
//       ExcludeCommon
//     >)
//   | ({ dateTime?: false; onlyTime?: false } & Omit<
//       DesktopDatePickerProps<string, DateTime>,
//       ExcludeCommon
//     >)

// export type DateTimePickerProps<T> = Dependant & {
//   id?: keyof T
//   noLabel?: boolean
//   fullWidth?: boolean
//   size?: TextFieldProps['size']
// }

// export const useDateTimePicker = <T>(props: DateTimePickerProps<T>) => {
//   const { id, onlyTime, dateTime, noLabel, fullWidth, size, ...textInputProps } = props
//   const { label } = textInputProps
//   const { rootId, inputHelpers, error, hasError } = useInput<T, number | null>({
//     id,
//     defInitialValue: null,
//   })

//   const { readonly, setFormErrors } = useFullForm<T>()

//   const { userSettings } = useUserPreferencesApi()

//   const format = onlyTime ? 'HH:mm' : !dateTime ? 'MM/dd/yyyy' : 'MM/dd/yyyy hh:mm a'
//   const defProps = useMemo(
//     () => ({
//       classes: { root: rootId },
//       clearable: true,
//       readOnly: readonly,
//       inputFormat: format,
//       ...textInputProps,
//     }),
//     [textInputProps, readonly, rootId, format]
//   )

//   const finalInputHelpers = useMemo(() => {
//     const { value, onChange, onBlur, ...restInputHelpers } = inputHelpers
//     let finalValue: DateTime | null = null
//     if (typeof value === 'number') {
//       // finalValue = DateTime.fromMillis(value, { locale: 'en', zone: 'utc' })
//       finalValue = DateTime.fromMillis(value)
//     }

//     const finalOnChange = (date: DateTime | null) => {
//       onChange({ target: { value: date?.toMillis() || null } })

//       if (!id) return

//       const error: Partial<Record<keyof T, string>> = {}
//       if (!date) return setFormErrors(error)

//       const formatted = date.toFormat(format)
//       if (formatted.includes('Invalid')) {
//         error[id] = `Invalid date (${format})`
//         setFormErrors(error)
//       }
//     }

//     const finalLabel = noLabel ? '' : label || firstToUpper(id)

//     return {
//       ...restInputHelpers,
//       fullWidth,
//       value: finalValue,
//       label: finalLabel,
//       onChange: finalOnChange,
//     }
//   }, [inputHelpers, label, id, noLabel, fullWidth, format, setFormErrors])

//   const FinalComponent = useMemo(() => {
//     const renderInput = (params: TextFieldProps) =>
//       createElement(TextField, {
//         ...params,
//         error: hasError,
//         helperText: hasError ? error : params.helperText,
//         size: size || finalInputHelpers.size,
//         inputProps: { ...params.inputProps, placeholder: format },
//         onKeyDown: dateTime ? (e) => e.preventDefault() : undefined,
//       })

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const pickerProps: any = {
//       ...finalInputHelpers,
//       ...defProps,
//       renderInput,
//     }

//     if (onlyTime) return createElement(DesktopTimePicker, pickerProps)
//     if (dateTime) return createElement(DesktopDateTimePicker, pickerProps)
//     return createElement(DesktopDatePicker, pickerProps)
//   }, [finalInputHelpers, onlyTime, dateTime, format, defProps, error, hasError, size])

//   const datePickerTheme = useMemo(() => {
//     if (userSettings.DarkMode) {
//       return darkTheme
//     }

//     const palette = userSettings.DarkMode ? brandDarkPalette : brandPalette
//     return createTheme({
//       palette: { primary: { main: palette.primary.main, contrastText: 'white' } },
//       components: brandInputs(palette),
//       typography: brandTypography(palette),
//     })
//   }, [userSettings.DarkMode])

//   return { ...props, datePickerTheme, FinalComponent }
// }
