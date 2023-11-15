import { Autocomplete, ListItem, TextField } from '@mui/material'
import { useAutocomplete2, Autocomplete2Props } from './useAutocomplete2'

const Autocomplete2 = <T,>(props: Autocomplete2Props<T>) => {
  const {
    inputHelpers,
    value,
    options,
    inputValue,
    rootId,
    hasError,
    error,
    helperText,
    label,
    isLoading = false,
    group = false,
    rootRef,
    sentryRef,
    onChangeAutocomplete,
    onChangeTextInput,
  } = useAutocomplete2(props)
  const { inputProps, ...restInputHelpers } = inputHelpers

  return (
    <Autocomplete
      {...restInputHelpers}
      value={value}
      disabled={inputProps.readOnly}
      classes={{ root: rootId }}
      inputValue={inputValue}
      options={options}
      loading={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ListboxProps={{ ref: rootRef } as any}
      onChange={(_, newValue) => onChangeAutocomplete(newValue)}
      groupBy={
        group
          ? (option) => {
              if (option.Id === -1) return '__'
              return option.Name.substring(0, 2)
            }
          : undefined
      }
      renderInput={(inputProps) => (
        <TextField
          value={inputValue}
          onChange={({ target }) => onChangeTextInput(target.value)}
          placeholder='Type to search'
          {...inputProps}
          label={label}
          error={hasError}
          helperText={error || helperText}
        />
      )}
      renderOption={(props, option) => {
        const { Name, Id } = option
        return (
          <ListItem {...props} ref={Id === -1 ? sentryRef : undefined}>
            {Name}
          </ListItem>
        )
      }}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.Name}
      isOptionEqualToValue={(a, b) => a.Id === b.Id}
      autoComplete
      fullWidth
    />
  )
}

export default Autocomplete2
