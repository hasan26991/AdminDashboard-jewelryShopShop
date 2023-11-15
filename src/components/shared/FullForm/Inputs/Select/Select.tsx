import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material'

import { Option } from '../Dropdown/useDropdown'
import { useSelect, SelectProps } from './useSelect'
import SelectOption from './SelectOption/SelectOption'

const Select = <T, K extends Option>(props: SelectProps<T, K>) => {
  const {
    label,
    inputProps,
    selectProps,
    inputHelpers,
    rootId,
    paginatedData,
    isCheckboxOption,
    groupBy,
    filterFn,
    onScroll,
  } = useSelect(props)

  return (
    <MuiAutocomplete
      ListboxProps={{ onScroll }}
      {...inputHelpers}
      {...selectProps}
      classes={{ root: rootId }}
      options={paginatedData}
      onInputChange={(event, newInputValue) => {
        filterFn(newInputValue)
      }}
      getOptionLabel={(option: Option) => option.Name}
      filterOptions={(x) => x} // overrides default filtering
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
      renderOption={(props, option, state) => (
        <SelectOption
          key={option.Id}
          isCheckboxOption={Boolean(isCheckboxOption)}
          listItemProps={props}
          option={groupBy ? { ...option, SecondaryName: undefined } : option}
          state={state}
        />
      )}
      renderInput={(params) => <TextField {...params} label={label} {...inputProps} />}
    />
  )
}

export default Select
