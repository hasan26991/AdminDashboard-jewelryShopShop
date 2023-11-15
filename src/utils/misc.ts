export const debounce = (
  timeout: NodeJS.Timer | null,
  callback: any,
  wait: number
) => {
  if (timeout) clearTimeout(timeout);
  return setTimeout(() => {
    callback();
  }, wait);
};
