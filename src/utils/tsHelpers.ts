import { memo } from "react";

export const genericMemo: <T>(component: T) => T = memo;

export const typedMemo: <T>(props: T) => T = memo;

export const isArray = <T>(
  selectedValue: T | T[] | null
): selectedValue is T[] => {
  return Array.isArray(selectedValue);
};
