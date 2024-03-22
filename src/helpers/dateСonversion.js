import { dateOptions } from "../const/constants";

export const dateConversion = (unixTime) => {
  return unixTime && new Date(unixTime * 1000).toLocaleString('ru', dateOptions);
}


