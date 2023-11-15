import { RadioGroupProps as MuiRadioGroupProps } from "@mui/material";
import { useMemo } from "react";

import { useFullForm } from "components/shared/FullForm/hooks/useFullForm";
import { useInput } from "components/shared/FullForm/hooks/useInput";
import { firstToUpper } from "utils/stringHelpers";
import { Option } from "../Dropdown/useDropdown";

type BooleanMode =
  | { options?: Option[]; yesOrNo?: false | undefined }
  | { yesOrNo: true };

export type RadioGroupProps<T> = BooleanMode &
  MuiRadioGroupProps & {
    id?: keyof T;
    label?: string;
    noLabel?: boolean;
    disabled?: boolean;
    variant?: "horizontal" | "vertical";
    onChangeRadio?: (
      val: boolean,
      selectedValue: string | number | boolean
    ) => void;
  };

export const useRadioGroup = <T>(props: RadioGroupProps<T>) => {
  const {
    id,
    label,
    noLabel,
    yesOrNo,
    variant = "horizontal",
    onChangeRadio,
  } = props;
  const finalId = String(id || "");

  const { inputHelpers, error, hasError } = useInput<T>({
    id,
    defInitialValue: "",
  });
  const { setInputValue } = useFullForm<T>();

  const finalOptions = useMemo(() => {
    if (yesOrNo) {
      return [
        { Id: true, Name: "Yes" },
        { Id: false, Name: "No" },
      ];
    }
    return props.options;
  }, [yesOrNo, props]);

  const finalInputHelpers = useMemo(() => {
    const { inputProps, ...rest } = inputHelpers;
    return {
      ...rest,
      readonly: inputProps.readOnly,
      onChange: (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
        if (inputProps.readOnly) return;

        let finalValue: string | number | boolean = val;
        const [first] = finalOptions || [];
        if (first && typeof first.Id === "number") {
          finalValue = Number(val);
        }
        if (first && typeof first.Id === "boolean") {
          finalValue = val === "true";
        }

        if (id) setInputValue({ id, value: finalValue });
        if (onChangeRadio) {
          const finalBooleanValue = val === "true";
          onChangeRadio(finalBooleanValue, finalValue);
        }
      },
    };
  }, [inputHelpers, id, finalOptions, setInputValue, onChangeRadio]);

  const finalLabel = noLabel ? label : label || firstToUpper(id);

  return {
    ...props,
    id: finalId,
    variant,
    label: finalLabel,
    inputHelpers: finalInputHelpers,
    options: finalOptions,
    error,
    hasError,
  };
};
