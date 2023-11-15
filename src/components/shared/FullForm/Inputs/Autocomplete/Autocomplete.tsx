import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material'
import { Option } from '../Dropdown/useDropdown'
import { useAutocomplete, AutocompleteProps } from './useAutocomplete'

const Autocomplete = <T, K extends Option>(props: AutocompleteProps<T, K>) => {
  const { label, inputProps, autocompleteProps, inputHelpers, rootId } = useAutocomplete(props)
  return (
    <MuiAutocomplete
      {...inputHelpers}
      {...autocompleteProps}
      classes={{ root: rootId }}
      disablePortal
      getOptionLabel={(option) => option.Name}
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
      renderOption={(props, option) => (
        <li {...props} key={option.Id}>
          {option.Name}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} {...inputProps} />}
    />
  )
}

export default Autocomplete
