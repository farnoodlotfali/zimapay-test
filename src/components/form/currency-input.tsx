import { digitsFaToEn } from "@persian-tools/persian-tools";
import { Control, useController } from "react-hook-form";
import { InputAdornment, TextField, Typography } from "@mui/material";

import { validateNumberInput } from "@/lib/validate-number-input";
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
        if (!validateNumberInput(e.target.value)) {
          return;
        }
        field.onChange(digitsFaToEn(e.target.value));
        if (input.props?.onChange) {
          input.props?.onChange(digitsFaToEn(e.target.value));
        }
      }}
      type="text"
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
          inputMode: "numeric",
        },
      }}
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
};
