import moment from "moment";

export const generateDate = (date: string | number) => moment(date).format("DD/MM/YYYY HH:mm");
