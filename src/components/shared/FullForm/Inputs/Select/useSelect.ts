import { AutocompleteProps as MuiAutocompleteProps, TextFieldProps } from '@mui/material'
import { CommonInput } from 'components/shared/FullForm/helpers/common'
import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
import { useInput } from 'components/shared/FullForm/hooks/useInput'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { sortByLocaleString } from 'utils/arrayHelper'
import { debounce } from 'utils/misc'
import { firstToUpper } from 'utils/stringHelpers'
import { isArray } from 'utils/tsHelpers'
import { IOptionSelected } from '../Autocomplete/useAutocomplete'
import { Option } from '../Dropdown/useDropdown'

export type SelectProps<T, K extends Option> = Omit<
  MuiAutocompleteProps<Option, boolean, undefined, undefined>,
  'id' | 'renderInput' | 'options'
> &
  CommonInput<T, unknown | null> & {
    label?: string
    inputProps?: TextFieldProps
    options: K[] | undefined
    onChangeText?: (debouncedText: string) => void
    searchBy?: 'start' | 'any'
    sortValue?: { field: keyof Option; order?: 'ASC' | 'DESC' }
    isCheckboxOption?: boolean
  }

export const useSelect = <T, K extends Option>(props: SelectProps<T, K>) => {
  const {
    id,
    inputProps,
    label,
    searchBy,
    sortValue,
    isCheckboxOption,
    onChanged,
    onChangeText,
    ...selectProps
  } = props
  const timeoutRef = useRef<NodeJS.Timer | null>(null)
  const { options, multiple } = selectProps

  const { rootId, inputHelpers, hasError, error } = useInput({
    id,
    defInitialValue: multiple ? [] : null,
  })
  const { value } = inputHelpers
  const [selected, setSelected] = useState<IOptionSelected>(multiple ? [] : null)
  const [page, setPage] = useState(1)
  const pageSize = 50
  const [data, setData] = useState<Option[]>([])
  const [filteredData, setFilteredData] = useState<Option[]>([])
  const [paginatedData, setPaginatedData] = useState<Option[]>([])
  const paginatedDataSorted = paginatedData.sort((a, b) => {
    if (!sortValue) {
      return 0
    }

    if (sortValue.field === 'Id') {
      if (sortValue.order === 'DESC') {
        return b.Id - a.Id
      }
      return a.Id - b.Id
    } else if (sortValue.field === 'Name') {
      if (sortValue.order === 'DESC') {
        return sortByLocaleString(b.Name, a.Name)
      }
      return sortByLocaleString(a.Name, b.Name)
    }

    return 0
  })

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
      if (onChanged) onChanged(value)
    }

    return { ...rest, onChange: finalOnChange }
  }, [inputHelpers, id, setInputValue, onChanged])

  const finalLabel = id ? label || firstToUpper(id) : label

  const includesString = (value: string, filterBy?: string): boolean =>
    Boolean(filterBy?.toLowerCase().includes(value?.toLowerCase()))
  const filterFn = (value: string) => {
    setPage(1)
    setFilteredData(
      data.filter(
        (d: Option) => includesString(value, d.Name) || includesString(value, d.SecondaryName)
      )
    )
  }

  const onScroll = (event: React.SyntheticEvent) => {
    const listboxNode = event.currentTarget
    if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 1) {
      const position = listboxNode.scrollTop
      setTimeout(() => {
        listboxNode.scrollTop = position
      }, 40)
      setPage((prev) => prev + 1)
    }
  }

  const finalOnChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeText) {
        timeoutRef.current = debounce(
          timeoutRef.current,
          () => onChangeText(ev.target.value),
          1000
        )
      }
    },
    [onChangeText]
  )

  useEffect(() => {
    if (isArray(value) && value.length) {
      setSelected(options?.filter((e) => (value as number[]).includes(e.Id)) || [])
    }
    if (!isArray(value)) {
      setSelected(options?.find((opt) => opt.Id === value) || null)
    }
  }, [options, value, id])

  useEffect(() => {
    if (options) {
      setData([...options])
      setFilteredData([...options])
    }
  }, [options])

  useEffect(() => {
    const paginateFn = () => {
      if (page * pageSize < filteredData.length) {
        setPaginatedData(filteredData.slice(0, page * pageSize))
      } else {
        setPaginatedData(filteredData)
      }
    }
    if (filteredData) paginateFn()
  }, [page, filteredData])

  return {
    ...props,
    rootId,
    label: finalLabel,
    inputProps: {
      ...inputProps,
      ...inputHelpers.inputProps,
      error: hasError,
      helperText: error || inputProps?.helperText,
      onChange: finalOnChangeInput,
      placeholder: props.placeholder,
    },
    selectProps: {
      ...selectProps,
      value: selected,
      readOnly: inputHelpers.inputProps.readOnly,
    },
    inputHelpers: finalInputHelpers,
    paginatedData: paginatedDataSorted,
    filterFn,
    onScroll,
  }
}
