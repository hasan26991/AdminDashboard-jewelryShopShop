import { Box, Chip, Icon, MenuItem, Paper, Popover, TextField } from '@mui/material'
import { useDropdown, DropdownProps } from './useDropdown'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
    },
  },
}

const Dropdown = <T,>(props: DropdownProps<T>) => {
  const {
    disabled,
    popoverWidth,
    inputRef,
    options,
    inputHelpers,
    children,
    optionsMenu,
    itemLabel,
    multiple,
    rootId,
    anchorEl,
    hasIdAsString,
    onDeleteMultiple,
    getOptionValues,
    handlePopoverOpen,
    handlePopoverClose,
    ...textFieldProps
  } = useDropdown(props)

  return (
    <>
      <TextField
        select
        classes={{ root: rootId }}
        {...inputHelpers}
        {...textFieldProps}
        disabled={disabled || inputHelpers.disabled}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        SelectProps={{
          IconComponent: (props) => <Icon {...props}>expand_more</Icon>,
          renderValue: multiple
            ? (values) => {
                const finalValues = values as number[]
                const optionValues = getOptionValues(finalValues)

                const Chips = optionValues.map((option) => {
                  const { Id, Name } = option

                  return (
                    <Chip
                      sx={{ mr: 0.5 }}
                      label={Name}
                      key={Id}
                      onDelete={
                        disabled || inputHelpers.disabled || inputHelpers.inputProps.readOnly
                          ? undefined
                          : () => onDeleteMultiple(finalValues, Id)
                      }
                      onMouseDown={(e) => {
                        e.stopPropagation()
                      }}
                    />
                  )
                })
                return <Box sx={{ overflow: 'hidden' }}>{Chips}</Box>
              }
            : undefined,
          multiple,
          MenuProps: multiple ? MenuProps : undefined,
          ref: inputRef,
        }}
      >
        <MenuItem value=''>
          <em>{itemLabel}</em>
        </MenuItem>
        {children}
        {optionsMenu}
      </TextField>
      {multiple && (inputHelpers.disabled || inputHelpers.inputProps.readOnly) && (
        <Popover
          sx={{ pointerEvents: 'none' }}
          open={!!anchorEl}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Paper sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: popoverWidth, p: 2 }}>
            {[...(options || [])]
              .filter((x) => inputHelpers.value.includes(x.Id))
              .sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }))
              .map(({ Id, Name }) => (
                <Chip key={String(Id)} label={Name} />
              ))}
          </Paper>
        </Popover>
      )}
    </>
  )
}

export default Dropdown
