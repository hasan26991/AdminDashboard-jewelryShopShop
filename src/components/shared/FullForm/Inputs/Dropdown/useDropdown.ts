import { Checkbox, ListItemText, MenuItem, TextFieldProps } from '@mui/material'
import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
import { useInput } from 'components/shared/FullForm/hooks/useInput'
import { createElement, useMemo, useRef, useState, useEffect } from 'react'
import { firstToUpper } from 'utils/stringHelpers'
import { RecursiveType } from 'utils/tsHelpers'

export type Option = { Name: string; Id: number; SecondaryName?: string }
export type OptionString = RecursiveType<Option, string>
type BooleanMode =
  | { onSelectOption?: (Id: number) => void; yesOrNo?: false | undefined }
  | { onSelectOption?: (Id: boolean) => void; yesOrNo: true }

export type DropdownProps<T> = Omit<TextFieldProps, 'id' | 'onClick'> &
  BooleanMode & {
    id?: keyof T
    multiple?: boolean
    noLabel?: boolean
    onDeleteOption?: (idToDelete: number) => void
  } & (
    | ({ hasIdAsString?: false } & { options?: Option[] })
    | ({ hasIdAsString: true } & { options?: OptionString[] })
  )

export const useDropdown = <T>(props: DropdownProps<T>) => {
  const inputRef = useRef<HTMLDivElement>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverWidth, setPopoverWidth] = useState<number>()

  const { id, options, label, noLabel, yesOrNo, onSelectOption, onDeleteOption, ...rest } =
    props
  const { multiple, disabled } = rest
  const { setInputValue } = useFullForm<T>()
  const { rootId, inputHelpers, hasError, error } = useInput<T>({
    id,
    defInitialValue: multiple ? [] : '',
  })
  const { inputProps } = inputHelpers

  const finalValue = useMemo(() => {
    if (yesOrNo) return inputHelpers.value ? 1 : 0
    if (!options) return multiple ? [] : ''
    if (options.length === 0) return multiple ? [] : ''

    return multiple && inputHelpers.value === '' ? [] : inputHelpers.value || ''
  }, [options, multiple, inputHelpers, yesOrNo])

  const optionsMenu = useMemo(() => {
    const finalOptions = yesOrNo
      ? [
          { Id: false, Name: 'No' },
          { Id: true, Name: 'Yes' },
        ]
      : options

    if (!finalOptions) return null
    const sortedOptions = [...finalOptions].sort((a, b) =>
      a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' })
    )
    return sortedOptions.map(({ Id, Name }) => {
      let isChecked = false
      if (multiple && Array.isArray(finalValue)) {
        isChecked = finalValue.some((e) => e === Id)
      }

      return createElement(
        MenuItem,
        {
          value: Id === true ? 1 : Id === false ? 0 : Id,
          key: String(Id),
          onClick: () => {
            if (!onSelectOption) return
            if (yesOrNo) {
              onSelectOption(Id as boolean)
            } else {
              onSelectOption(Id as number)
            }
          },
        },
        multiple
          ? [
              createElement(Checkbox, { checked: isChecked, key: `Checkbox-${Id}` }),
              createElement(ListItemText, { primary: Name, key: `Label-${Id}` }),
            ]
          : Name
      )
    })
  }, [finalValue, multiple, options, yesOrNo, onSelectOption])

  const getOptionValues = (values: number[]) => {
    const finalValues = values
    const optionValues = (finalValues
      ?.map((e) => {
        if (!options) return null
        return [...options].find((opt) => e === opt.Id)
      })
      .filter((e) => e) || []) as Option[]

    return optionValues.sort((a, b) =>
      a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' })
    )
  }
  /*
  const renderValue = useMemo(() => {
    if (!multiple) return undefined
    return (values: unknown) => {
      const finalValues = values as number[]
      const optionValues = (finalValues
        ?.map((e) => {
          if (!options) return null
          return [...options].find((opt) => e === opt.Id)
        })
        .filter((e) => e) || []) as Option[]

      return optionValues
        .sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }))
        .map((option) => {
          const { Id, Name } = option
          const onDelete = () => {
            if (id) {
              setInputValue({ id, value: finalValues.filter((e) => e !== Id) })
              if (onDeleteOption) onDeleteOption(Id)
            }
          }

          return createElement(Chip, {
            sx: { mr: 0.5 },
            key: Id,
            label: Name,
            onDelete:
              disabled || inputHelpers.disabled || inputHelpers.inputProps.readOnly
                ? undefined
                : onDelete,
            onMouseDown: (e) => {
              e.stopPropagation()
            },
          })
        })
    }
  }, [
    id,
    disabled,
    multiple,
    options,
    inputHelpers.disabled,
    inputHelpers.inputProps.readOnly,
    setInputValue,
    onDeleteOption,
  ])
*/
  const finalLabel = noLabel ? '' : label || firstToUpper(id)
  const itemLabel =
    optionsMenu && optionsMenu?.length === 0 ? 'No options' : 'Select an option'

  const finalOnChange = (eve: React.ChangeEvent<{ value: T | string | number }>) => {
    const value = eve.target.value
    if (id) {
      if (value !== '') setInputValue({ id, value: yesOrNo ? value === 1 : value })
      else setInputValue({ id, value: yesOrNo ? value === 1 : null })
    }
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const onDeleteMultiple = (values: number[], itemId: number) => {
    if (id) {
      setInputValue({ id, value: values.filter((e) => e !== itemId) })
      if (onDeleteOption) onDeleteOption(itemId)
    }
  }

  useEffect(() => {
    if (multiple) {
      setPopoverWidth(inputRef.current?.offsetWidth)
    }
  }, [multiple])

  useEffect(() => {
    if (disabled || inputProps.readOnly) {
      setAnchorEl(null)
    }
  }, [disabled, inputProps.readOnly])

  return {
    ...rest,
    inputRef,
    rootId,
    inputHelpers: {
      ...inputHelpers,
      onChange: finalOnChange,
    },
    options,
    optionsMenu,
    label: finalLabel,
    itemLabel,
    error: hasError || props.error,
    value: finalValue,
    helperText: error || rest.helperText,
    anchorEl,
    popoverWidth,
    onDeleteMultiple,
    getOptionValues,
    handlePopoverOpen,
    handlePopoverClose,
  }
}
