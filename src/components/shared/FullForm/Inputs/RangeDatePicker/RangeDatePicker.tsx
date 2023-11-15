import * as React from 'react'
import { DateTime } from 'luxon'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { useRangeDatePicker, RangeDatePickerProps, CustomWeek } from './useRangeDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { PickerSelectionState } from '@mui/x-date-pickers/internals/hooks/usePickerState'
import { Button, DialogActions } from '@mui/material'

type RootProps = PickersDayProps<DateTime> & {
  dayIsBetween?: boolean
  isFirstDay?: boolean
  isLastDay?: boolean
  isSpecificDay?: boolean
  backgroundColor: string | null
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' &&
    prop !== 'isFirstDay' &&
    prop !== 'isLastDay' &&
    prop !== 'isSpecificDay' &&
    prop !== 'backgroundColor',
})<RootProps>(
  ({ theme, dayIsBetween, isFirstDay, isLastDay, isSpecificDay, backgroundColor }) => ({
    fontSize: 15,
    width: 40,
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: backgroundColor || theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
    ...(isSpecificDay && {
      borderRadius: 0,
      border: '4px #f33 solid',
    }),
  })
) as React.ComponentType<RootProps>

const ActionsBar = (onTodayClick: React.MouseEventHandler<HTMLButtonElement>) => {
  return (
    <DialogActions sx={{ marginTop: '-35px', marginRight: 15 }}>
      <Button variant='outlined' onClick={onTodayClick}>
        Today
      </Button>
    </DialogActions>
  )
}

const RangeDatePicker = <T,>(props: RangeDatePickerProps<T>) => {
  const { value, maxDate, customWeeks, onTodayClick, checkDate, onChange } =
    useRangeDatePicker(props)

  const renderWeekPickerDay = (
    date: DateTime,
    selectedDays: Array<DateTime | null>,
    pickersDayProps: PickersDayProps<DateTime>,
    customWeeks?: CustomWeek[]
  ) => {
    let backgroundColor = null

    if (!value) {
      return <PickersDay {...pickersDayProps} />
    }

    let [dayIsBetween, isFirstDay, isLastDay, isSpecificDay] = checkDate(date, value)

    if (customWeeks) {
      customWeeks.forEach((week) => {
        if (!dayIsBetween) {
          ;[dayIsBetween, isFirstDay, isLastDay] = checkDate(date, week.Date)

          if (dayIsBetween) {
            backgroundColor = week.Color
            return backgroundColor
          }
        }
      })
    }

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isSpecificDay={isSpecificDay}
        backgroundColor={backgroundColor}
      />
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        label='Week picker'
        value={value}
        maxDate={maxDate}
        onChange={(value, keyboardInputValue) =>
          onChange(value, keyboardInputValue as PickerSelectionState)
        }
        renderDay={(day, selectedDays, dayProps) =>
          renderWeekPickerDay(day, selectedDays, dayProps, customWeeks)
        }
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
        components={{
          ActionBar: () => ActionsBar(onTodayClick),
        }}
      />
    </LocalizationProvider>
  )
}

export default RangeDatePicker
