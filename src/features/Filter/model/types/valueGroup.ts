import { Dayjs } from "dayjs";

export type DayjsType = [Dayjs | null, Dayjs | null];
export type Value = (string | number)[] | undefined;
export type ValueGroup = Value | DayjsType | string | null;
