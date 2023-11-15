// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const firstToUpper = (str: any) => {
  const finalStr = String(str || "");
  const separated = finalStr.replace(/([a-z])([A-Z])/g, "$1 $2");
  if (!separated) return "";

  return separated[0].toUpperCase() + separated.slice(1);
};

export const padLeft = (
  num: number,
  size: number,
  decimalPoint: "." | "," = "."
) => {
  if (!num) return "";
  const [first, decimals] = num.toString().split(decimalPoint);
  let padded = first;
  while (padded.length < size) padded = "0" + padded;
  return `${padded}${decimals ? `${decimalPoint}${decimals}` : ""}`;
};

export const startsWithNoCase = (
  one: string | undefined,
  two: string | undefined
) => {
  if (!one || !two) return false;
  return one.toLowerCase().startsWith(two.toLowerCase());
};

export const startsWithEachWord = (search: string, sentence: string) => {
  let startsWith = false;
  sentence.split(" ").forEach((word) => {
    if (word.toLowerCase().startsWith(search.toLowerCase())) startsWith = true;
  });

  return startsWith;
};
