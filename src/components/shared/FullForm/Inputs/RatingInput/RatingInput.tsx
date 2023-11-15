import { Box, FormControlLabel, FormHelperText, Rating } from '@mui/material'
import { RatingInputProps, useRatingInput } from './useRatingInput'

const RatingInput = <T,>(props: RatingInputProps<T>) => {
  const { inputHelpers, required, hasError, error } = useRatingInput(props)
  return (
    <Box mt={1}>
      <FormControlLabel
        sx={{ alignItems: 'start', padding: 0, margin: 0 }}
        labelPlacement='top'
        label={`Rating${required ? ' *' : ''}`}
        control={<Rating size='large' {...inputHelpers} />}
      />
      {hasError && <FormHelperText error={hasError}>{error}</FormHelperText>}
    </Box>
  )
}

export default RatingInput
