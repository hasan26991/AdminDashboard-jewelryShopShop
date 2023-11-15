import { Box } from '@mui/material'
import { RowProps, useRow } from './useRow'

const FormGrid: React.FC<RowProps> = (props) => {
  const { gridTemplateColumns, noBottomMargin, ...rest } = useRow(props)
  return (
    <Box
      display='grid'
      mb={noBottomMargin ? '0px' : '16px'}
      columnGap='16px'
      gridTemplateColumns={gridTemplateColumns}
      {...rest}
    />
  )
}

export default FormGrid
