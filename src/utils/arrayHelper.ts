export const sortByLocaleString = (a?: string, b?: string) =>
  (a ?? "").localeCompare(b ?? "", "en", { sensitivity: "base" });
