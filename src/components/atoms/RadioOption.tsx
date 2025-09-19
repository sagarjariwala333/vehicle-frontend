import React, { ChangeEvent } from 'react';
import { FormControlLabel, Radio, RadioProps } from '@mui/material';

interface RadioOptionProps extends Omit<RadioProps, 'onChange'> {
  value: string;
  label: string;
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  checked = false,
  onChange,
  disabled = false,
  ...props
}) => {
  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default RadioOption;
