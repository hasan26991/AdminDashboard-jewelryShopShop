import { BoxProps } from '@mui/material'
import { useMemo } from 'react'

export interface RowProps extends Omit<BoxProps, 'gridTemplateColumns'> {
  gridTemplateColumns?: string
  noBottomMargin?: boolean
}

export const useRow = (props: RowProps) => {
  const { gridTemplateColumns, children } = props

  const finalGridTemplateColumns = useMemo(() => {
    const childrenCount = Array.isArray(children) ? children.filter((e) => e).length : 1
    const gridTemplateCols = `repeat(${childrenCount},1fr)`
    return gridTemplateColumns || gridTemplateCols
  }, [children, gridTemplateColumns])

  return { ...props, gridTemplateColumns: finalGridTemplateColumns }
}
