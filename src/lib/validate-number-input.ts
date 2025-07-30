import { digitsFaToEn } from "@persian-tools/persian-tools";

// validate number input
export const validateNumberInput = (val: any) => {
  const valueInput = Number(digitsFaToEn(val.replace(/,/g, "").replace(/ /g, "")));

  return !isNaN(valueInput);
};
