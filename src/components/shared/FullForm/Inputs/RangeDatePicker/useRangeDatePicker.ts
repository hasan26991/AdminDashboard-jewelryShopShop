import { DateTime } from 'luxon'
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { useInput } from 'components/shared/FullForm/hooks/useInput'
import { useFullForm } from 'components/shared/FullForm/hooks/useFullForm'
import { PickerSelectionState } from '@mui/x-date-pickers/internals/hooks/usePickerState'

export type CustomWeek = {
  Date: DateTime
  Color: string
}

export interface RangeDatePickerProps<T> extends Omit<PickersDayProps<DateTime>, 'id'> {
  id: keyof T
  label?: string
  dayIsBetween?: boolean
  isFirstDay?: boolean
  isLastDay?: boolean
  maxDate?: DateTime
  customWeeks?: CustomWeek[]
  specificDates?: DateTime[]
  parseValue?: (val: string | number) => string | number
}

export const useRangeDatePicker = <T>(props: RangeDatePickerProps<T>) => {
  const { id, onDaySelect, specificDates, ...rest } = props
  const { rootId, inputHelpers, hasError, error } = useInput<T>({
    id,
    defInitialValue: '',
  })
  const { value, onChange } = inputHelpers
  const { setInputValue } = useFullForm<T>()

  let finalValue: DateTime | null = null
  if (typeof value === 'number') {
    finalValue = DateTime.fromMillis(value)
  }

  const finalOnChange = (ev: DateTime | null, isFinish: PickerSelectionState) => {
    if (ev) {
      const weekDay = ev.startOf('week').valueOf()
      if (id) setInputValue({ id, value: weekDay })
      if (onChange) onChange({ target: { value: weekDay || null } })
      if (onDaySelect) onDaySelect(ev.startOf('week'), isFinish)
    }
  }

  const onTodayClick = () => {
    if (id) setInputValue({ id, value: DateTime.now().startOf('week').valueOf() })
  }

  const checkDate = (day: DateTime, weekDate: DateTime) => {
    const start = weekDate.startOf('week')
    const end = weekDate.endOf('week')

    const dayIsBetween =
      day.toISODate() >= start.toISODate() && day.toISODate() <= end.toISODate()
    const isFirstDay = day.toISODate() === start.toISODate()
    const isLastDay = day.toISODate() === end.toISODate()
    const isSpecificDay = specificDates?.some((date) => date.toISODate() === day.toISODate())

    return [dayIsBetween, isFirstDay, isLastDay, isSpecificDay]
  }

  return {
    ...rest,
    rootId,
    inputHelpers,
    hasError,
    error,
    value: finalValue,
    onChange: finalOnChange,
    onTodayClick,
    checkDate,
  }
}
