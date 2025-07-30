import { Control, useController } from "react-hook-form";
import { InputAdornment, TextField, Typography } from "@mui/material";

import { CurrencyInputType } from "@/types/input-types";

type Props = {
  input: CurrencyInputType;
  control: Control<any>;
};

export const CurrencyInput = ({ input, control }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: control,
  });

  return (
    <TextField
      fullWidth
      {...input.props}
      inputRef={field.ref}
      value={field.value ?? ""}
      onChange={(e) => {
        field.onChange(e);
        if (input.props?.onChange) {
          input.props?.onChange(e);
        }
      }}
      type="number"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "end",
                gap: 1,
              }}
              position="end"
            >
              <Typography component="span" fontWeight={600} color="text.primary" fontSize={12}>
                {input.currencyName}
              </Typography>
              <img
                src={input.img}
                alt="Currency img"
                style={{
                  width: 22,
                  height: 22,
                }}
              />
            </InputAdornment>
          ),
        },
        htmlInput: {
          onWheel: (e: React.WheelEvent<HTMLDivElement>) => e.currentTarget.blur(),
          style: {
            direction: "ltr",
          },
        },
      }}
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
};
