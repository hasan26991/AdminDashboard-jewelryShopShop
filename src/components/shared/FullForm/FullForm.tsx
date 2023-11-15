/* eslint-disable @typescript-eslint/no-explicit-any */
import FullFormProvider from "./FormProvider/FullFormProvider";
import { FullFormProviderProps } from "./FormProvider/useFullFormProvider";
import Checkbox from "./Inputs/Checkbox/Checkbox";
import { CheckboxProps } from "./Inputs/Checkbox/useCheckbox";
// import DateTimePicker from "./Inputs/DateTimePicker/DateTimePicker";
// import { DateTimePickerProps } from "./Inputs/DateTimePicker/useDateTimePicker";
import Dropdown from "./Inputs/Dropdown/Dropdown";
import { DropdownProps } from "./Inputs/Dropdown/useDropdown";
// import NumericTextInput from "./Inputs/NumericTextInput/NumericTextInput";
// import { NumericTextInputProps } from "./Inputs/NumericTextInput/useNumericTextInput";
import TextInput from "./Inputs/TextInput/TextInput";
import { TextInputProps } from "./Inputs/TextInput/useTextInput";
import Autocomplete from "./Inputs/Autocomplete/Autocomplete";
import { AutocompleteProps } from "./Inputs/Autocomplete/useAutocomplete";
import { RadioGroupProps } from "./Inputs/RadioGroup/useRadioGroup";
import RadioGroup from "./Inputs/RadioGroup/RadioGroup";
import { SelectProps } from "./Inputs/Select/useSelect";
import Select from "./Inputs/Select/Select";
// import TimestampInput from "./Inputs/TimestampInput/TimestampInput";
// import { TimestampInputProps } from "./Inputs/TimestampInput/useTimestampInput";
import RangeDatePicker from "./Inputs/RangeDatePicker/RangeDatePicker";
import { RangeDatePickerProps } from "./Inputs/RangeDatePicker/useRangeDatePicker";
import { genericMemo } from "utils/tsHelpers";
import { RatingInputProps } from "./Inputs/RatingInput/useRatingInput";
import RatingInput from "./Inputs/RatingInput/RatingInput";
import Autocomplete2 from "./Inputs/Autocomplete2/Autocomplete2";
import { Autocomplete2Props } from "./Inputs/Autocomplete2/useAutocomplete2";

type FullFormProps<T> = FullFormProviderProps<T>;

export interface ExtendedFormTable<T> {
  FullForm: React.FC<FullFormProps<T>>;
  TextInput: React.FC<TextInputProps<T>>;
  // NumericTextInput: React.FC<NumericTextInputProps<T>>;
  Dropdown: React.FC<DropdownProps<T>>;
  // DateTimePicker: React.FC<DateTimePickerProps<T>>;
  Checkbox: React.FC<CheckboxProps<T>>;
  // TODO: WE will create another Autocomplete to prevent breaking anything.
  // Once the poc is made the idea is to remove to have only 1 component for autocomplete & Select
  Autocomplete2: React.FC<Autocomplete2Props<T>>;
  Autocomplete: React.FC<AutocompleteProps<T, any>>;
  Select: React.FC<SelectProps<T, any>>;
  RadioGroup: React.FC<RadioGroupProps<T>>;
  // TimestampInput: React.FC<TimestampInputProps>;
  RangeDatePicker: React.FC<RangeDatePickerProps<T>>;
  RatingInput: React.FC<RatingInputProps<T>>;
}

export const createFullForm = <T,>(): ExtendedFormTable<T> => ({
  FullForm: FullFormProvider,
  TextInput: genericMemo(TextInput),
  // NumericTextInput: genericMemo(NumericTextInput),
  Dropdown: genericMemo(Dropdown),
  // DateTimePicker: genericMemo(DateTimePicker),
  Checkbox: genericMemo(Checkbox),
  Autocomplete2: genericMemo(Autocomplete2),
  Autocomplete: genericMemo(Autocomplete),
  Select: genericMemo(Select),
  RadioGroup: genericMemo(RadioGroup),
  // TimestampInput: genericMemo(TimestampInput),
  RangeDatePicker: genericMemo(RangeDatePicker),
  RatingInput: genericMemo(RatingInput),
});
