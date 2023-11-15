// import { TextField } from "@mui/material";
// import {
//   useNumericTextInput,
//   NumericTextInputProps,
// } from "./useNumericTextInput";
// import NumberFormat from "react-number-format";

// const NumericTextInput = <T,>(props: NumericTextInputProps<T>) => {
//   const {
//     rootId,
//     inputHelpers,
//     changeValue,
//     error,
//     hasError,
//     ...textFieldProps
//   } = useNumericTextInput(props);
//   return (
//     <NumberFormat
//       {...inputHelpers}
//       error={hasError}
//       classes={{ root: rootId }}
//       onValueChange={changeValue}
//       helperText={
//         hasError
//           ? typeof error === "string"
//             ? error
//             : ""
//           : textFieldProps.helperText
//       }
//       {...textFieldProps}
//       customInput={TextField}
//     />
//   );
// };

// export default NumericTextInput;
