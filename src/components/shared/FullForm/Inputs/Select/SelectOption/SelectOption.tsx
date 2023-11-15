import { Checkbox, Icon, ListItemText } from '@mui/material'

import { useSelectOption, SelectOptionProps } from './useSelectOption'

const SelectOption: React.FC<SelectOptionProps> = (props) => {
  const { id, isCheckboxOption, option, listItemProps, state } = useSelectOption(props)
  const { selected } = state

  return (
    <li {...listItemProps} key={option.Id}>
      {isCheckboxOption && (
        <Checkbox
          icon={<Icon fontSize='small'>close</Icon>}
          checkedIcon={<Icon fontSize='small'>check</Icon>}
          style={{ marginRight: 8 }}
          checked={selected}
          inputProps={{ 'aria-labelledby': id }}
        />
      )}
      <ListItemText id={id} primary={option.Name} secondary={option.SecondaryName} />
    </li>
  )
}

export default SelectOption
