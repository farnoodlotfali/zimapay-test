import { Control, useController } from "react-hook-form";
import { MenuItem, TextField, Typography } from "@mui/material";

import { SelectInputType } from "@/types/input-types";

type Props = {
  input: SelectInputType;
  control: Control<any>;
};

export const SelectInput = ({ input, control }: Props) => {
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
      select
      {...input.props}
      inputRef={field.ref}
      value={field.value ?? ""}
      onChange={(e) => {
        field.onChange(e);
        if (input.props?.onChange) {
          input.props?.onChange(
            e,
            input.options.find((op) => op[input.valueName] === e.target.value)
          );
        }
      }}
      error={!!error}
      helperText={error ? error.message : ""}
    >
      <MenuItem disabled value={""}>
        <Typography fontSize={14} color="grey.700" component="span">
          {input?.props?.placeholder}
        </Typography>
      </MenuItem>

      {input.options?.map((option, i) => {
        return (
          <MenuItem
            value={option[input.valueName]}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            key={i}
          >
            {option[input.titleName]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
