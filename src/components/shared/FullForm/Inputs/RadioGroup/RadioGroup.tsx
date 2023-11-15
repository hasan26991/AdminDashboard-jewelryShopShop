import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import { useRadioGroup, RadioGroupProps } from "./useRadioGroup";

const RadioGroup = <T,>(props: RadioGroupProps<T>) => {
  const {
    id,
    options,
    label,
    disabled,
    inputHelpers,
    hasError,
    error,
    variant,
    noLabel,
    ...muiRadioProps
  } = useRadioGroup(props);
  const { readonly, ...rest } = inputHelpers;

  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <MuiRadioGroup
        row={variant === "horizontal"}
        aria-labelledby={id}
        {...muiRadioProps}
        {...rest}
      >
        {options?.map(({ Id, Name }) => (
          <FormControlLabel
            value={Id}
            key={String(Id)}
            disabled={inputHelpers.disabled || disabled}
            control={
              <Radio
                // sx={{ color: hasError ? 'red' : palette, '&.Mui-checked': { color: palette } }}
                readOnly={readonly}
              />
            }
            label={Name}
          />
        ))}
      </MuiRadioGroup>
      <FormHelperText sx={{ color: "red" }}>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroup;
