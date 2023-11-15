// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommonInput<T, U = any> = { id?: keyof T; onChanged?: (val: U) => void }
