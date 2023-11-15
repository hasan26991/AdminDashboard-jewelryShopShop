import { AutocompleteProps as MuiAutocompleteProps, TextFieldProps } from '@mui/material'
import { CommonInput } from 'components/shared/FullForm/helpers/common'
import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
import { useInput } from 'components/shared/FullForm/hooks/useInput'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { firstToUpper } from 'utils/stringHelpers'
import { isArray } from 'utils/tsHelpers'
import { Option } from '../Dropdown/useDropdown'
import debounce from 'lodash.debounce'

export type AutocompleteProps<T, K extends Option> = Omit<
  MuiAutocompleteProps<Option, boolean, undefined, undefined>,
  'id' | 'renderInput' | 'options'
> &
  CommonInput<T, K | null> & {
    label?: string
    inputProps?: TextFieldProps
    options: K[]
    required?: boolean
    minLengthToSearch?: number
    onChangeText?: (debouncedText: string) => void
  }

export type IOptionSelected = Option | Option[] | null

export const useAutocomplete = <T, K extends Option>(props: AutocompleteProps<T, K>) => {
  const {
    id,
    inputProps,
    label,
    required,
    minLengthToSearch,
    onChanged,
    onChangeText,
    ...autocompleteProps
  } = props

  const { options, multiple } = autocompleteProps

  const { rootId, inputHelpers, hasError, error } = useInput({
    id,
    defInitialValue: null,
  })
  const { value } = inputHelpers
  const [selected, setSelected] = useState<IOptionSelected>(multiple ? [] : null)

  const debouncedSearch = useRef(
    debounce((criteria: string) => {
      if (criteria.length >= (minLengthToSearch || 2) && onChangeText) onChangeText(criteria)
    }, 1000)
  )

  const { setInputValue } = useFullForm<T>()

  const finalInputHelpers = useMemo(() => {
    const { inputProps, value, ...rest } = inputHelpers
    const finalOnChange = (
      ev: React.SyntheticEvent<Element, Event>,
      value: IOptionSelected
    ) => {
      setSelected(value)
      if (id) {
        if (isArray(value)) {
          setInputValue({ id, value: value.map((val) => val.Id) })
        } else {
          setInputValue({ id, value: value?.Id || null })
        }
      }
      if (onChanged) onChanged(value as K)
    }

    const finalValue = multiple ? value || [] : value

    return { ...rest, onChange: finalOnChange, value: finalValue }
  }, [inputHelpers, id, multiple, setInputValue, onChanged])

  const finalLabel = id ? label || firstToUpper(id) : label

  const finalOnChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debouncedSearch.current(ev.target.value)
    },
    []
  )

  useEffect(() => {
    if (!isArray(selected)) {
      if (value !== (selected?.Id || null)) {
        setSelected(options.find((opt) => opt.Id === value) || null)
      }
    }
  }, [value, options, selected])

  return {
    ...props,
    rootId,
    label: finalLabel,
    inputProps: {
      ...inputProps,
      ...inputHelpers.inputProps,
      error: hasError,
      helperText: error || inputProps?.helperText,
      placeholder: props.placeholder,
      required,
      onChange: finalOnChangeInput,
    },
    autocompleteProps: {
      ...autocompleteProps,
      value: selected,
      readOnly: inputHelpers.inputProps.readOnly,
    },
    inputHelpers: finalInputHelpers,
  }
}
