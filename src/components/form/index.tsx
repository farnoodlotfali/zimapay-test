import { PropsWithChildren } from "react";
import { Control } from "react-hook-form";
import { Grid, GridBaseProps } from "@mui/material";

import { CurrencyInput } from "./currency-input";
import { SelectInput } from "./select-input";
import { INPUT_TYPE } from "@/constant/input-type";
import { FormInputsType } from "@/types/input-types";

type HandleInputTypeProps = {
  field: FormInputsType;
  control: Control<any>;
};

const HandleInputType = ({ control, field }: HandleInputTypeProps) => {
  switch (field.inputType) {
    // case INPUT_TYPE.TEXT:
    //   return <TextInput input={field} control={control} />;

    case INPUT_TYPE.CURRENCY:
      return <CurrencyInput input={field} control={control} />;

    case INPUT_TYPE.SELECT:
      return <SelectInput input={field} control={control} />;
    case INPUT_TYPE.CUSTOM:
      return <>{field.customView}</>;

    default:
      return <></>;
  }
};

type FormInputsProps = {
  inputs: FormInputsType[];
  size?: GridBaseProps["size"];
  spacing?: GridBaseProps["spacing"];
  control: Control<any>;
};

const FormInputs: React.FC<PropsWithChildren<FormInputsProps>> = ({
  children,
  inputs,
  control,
  size = { xs: 12 },
  spacing = 2,
}) => {
  return (
    <Grid container spacing={spacing}>
      {inputs.map((field, i) => (
        <Grid
          size={
            {
              ...(size as object),
              ...(field.gridSize as object),
            } as GridBaseProps["size"]
          }
          key={i}
        >
          <HandleInputType field={field} control={control} />
        </Grid>
      ))}
      {children}
    </Grid>
  );
};

export { FormInputs };
