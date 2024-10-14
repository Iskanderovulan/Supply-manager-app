import { Dayjs } from "dayjs";

export type DayjsType = [Dayjs | null, Dayjs | null];
export type Value = (string | number)[];
export type ValueGroup = Value | DayjsType | string | null;
