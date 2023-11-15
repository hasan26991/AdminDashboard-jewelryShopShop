import { Checkbox as MuiCheckbox, FormHelperText, FormControlLabel, Box } from '@mui/material'
import { useCheckbox, CheckboxProps } from './useCheckbox'

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const { id, rootId, inputHelpers, hasError, error, label, labelPlacement, ...inputProps } =
    useCheckbox(props)

  if (label) {
    return (
      <Box>
        <FormControlLabel
          label={label}
          labelPlacement={labelPlacement}
          control={
            <MuiCheckbox
              classes={{ root: rootId }}
              // id={String(id)}
              {...inputHelpers}
              {...inputProps}
            />
          }
        />
        {hasError && <FormHelperText error={hasError}>{error}</FormHelperText>}
      </Box>
    )
  }

  return <MuiCheckbox classes={{ root: rootId }} {...inputHelpers} {...inputProps} />
}

export default Checkbox
