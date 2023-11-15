import { useCallback, useMemo, useRef, useState } from 'react'
import { CommonInput } from '../../helpers/common'
import { Option } from '../Dropdown/useDropdown'
import debounce from 'lodash.debounce'
import { useFullForm } from '../../hooks/useFullForm'
import { useInput } from '../../hooks/useInput'
import { firstToUpper } from 'utils/stringHelpers'
import useInfiniteScroll from 'react-infinite-scroll-hook'

export interface Autocomplete2Props<T> extends CommonInput<T, Option> {
  options: Option[]
  fieldLabel?: string
  label?: string
  group?: boolean
  isLoading?: boolean
  minLengthToSearch?: number
  debounceTimeout?: number
  helperText?: string
  itemsPerPage?: number
  hasNextPage: boolean
  onChangeText: (text: string, skip: number, count: number) => void
}

export const useAutocomplete2 = <T>(props: Autocomplete2Props<T>) => {
  const {
    id,
    options,
    label,
    itemsPerPage = 10,
    minLengthToSearch = 2,
    debounceTimeout = 1000,
    isLoading,
    hasNextPage,
    onChangeText,
  } = props

  const skipRef = useRef(0)

  const debouncedSearch = useRef(
    debounce((criteria: string) => {
      if (criteria.length >= minLengthToSearch) {
        skipRef.current = 0
        onChangeText(criteria, skipRef.current, itemsPerPage)
      }
      if (criteria.length === 0) {
        onChangeAutocomplete(null)
      }
    }, debounceTimeout)
  )

  const fieldLabel = (props.fieldLabel ||
    String(props.fieldLabel).replace(/Id$/, 'Name')) as keyof T

  const { rootId, inputHelpers, hasError, error } = useInput({
    id,
    defInitialValue: null,
  })

  const { formState, setInputValue: setFullFormInputValue } = useFullForm<T>()
  const { values } = formState

  const finalLabel = id ? label || firstToUpper(id) : label

  const finalOptions = useMemo(() => {
    if (hasNextPage) {
      if (options.find((e) => e.Id === -1)) return options
      return [...options, { Id: -1, Name: 'Loading More...' }]
    }
    return options
  }, [options, hasNextPage])

  const value = useMemo(() => {
    if (!id) return null
    return options.find((e) => e.Id === values[id]) || null
  }, [options, id, values])

  const [inputValue, setInputValue] = useState<string>(values[fieldLabel as keyof T] as string)

  const onLoadMore = useCallback(() => {
    skipRef.current = skipRef.current + 10
    onChangeText(inputValue, skipRef.current, itemsPerPage)
  }, [onChangeText, inputValue, itemsPerPage])

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: !!isLoading,
    hasNextPage,
    onLoadMore,
  })

  const onChangeAutocomplete = (value: Option | null) => {
    setInputValue(value?.Name || '')
    if (!id) return
    setFullFormInputValue({ id, value: value?.Id || null })
    setFullFormInputValue({ id: fieldLabel, value: value?.Name || null })
  }

  const onChangeTextInput = (value: string) => {
    setInputValue(value)
    debouncedSearch.current(value)
  }

  return {
    ...props,
    rootId,
    error,
    hasError,
    inputHelpers,
    inputValue,
    options: finalOptions,
    value,
    label: finalLabel,
    sentryRef,
    rootRef,
    onChangeAutocomplete,
    onChangeTextInput,
  }
}
