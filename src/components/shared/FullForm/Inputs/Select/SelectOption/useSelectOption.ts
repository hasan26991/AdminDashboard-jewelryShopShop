import { AutocompleteRenderOptionState } from '@mui/material'
import { useId } from 'react'

import { Option } from '../../Dropdown/useDropdown'

export interface SelectOptionProps {
  isCheckboxOption: boolean
  listItemProps: React.HTMLAttributes<HTMLLIElement>
  option: Option
  state: AutocompleteRenderOptionState
}

export const useSelectOption = (props: SelectOptionProps) => {
  const id = useId()

  return { ...props, id }
}
