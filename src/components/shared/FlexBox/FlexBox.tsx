import { Box, BoxProps } from '@mui/material'

export const FlexBox: React.FC<BoxProps> = (props) => (
  <Box display='flex' flex={1} flexDirection='column' {...props} />
)
