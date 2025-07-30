import { ChangeEvent } from "react";
import { GridBaseProps, TextFieldProps } from "@mui/material";

import { INPUT_TYPE } from "@/constant/input-type";

type General = {
  name: string;
  gridSize?: GridBaseProps["size"];
  helperText?: string;
  props?: TextFieldProps;
};

export type TextInputType = General & {};
export type CurrencyInputType = General & {
  img: string;
  currencyName: string;
  props?: Omit<TextFieldProps, "onChange"> & {
    onChange?: (e: string) => void;
  };
};

export type NumberInputType = TextInputType & {
  splitter?: boolean;
};

export type SelectInputType = Omit<General, "props"> & {
  options: any[];
  valueName: string;
  titleName: string;
  props?: Omit<TextFieldProps, "onChange"> & {
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, obj: any) => void;
  };
};
export type CustomInputType = {
  customView: any;
  gridSize?: GridBaseProps["size"];
};

export type FormInputsType =
  | (TextInputType & {
      inputType: INPUT_TYPE.TEXT;
    })
  | (NumberInputType & {
      inputType: INPUT_TYPE.NUMBER;
    })
  | (CurrencyInputType & {
      inputType: INPUT_TYPE.CURRENCY;
    })
  | (SelectInputType & {
      inputType: INPUT_TYPE.SELECT;
    })
  | (CustomInputType & {
      inputType: INPUT_TYPE.CUSTOM;
    });
