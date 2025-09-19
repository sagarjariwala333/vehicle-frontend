import React, { ReactNode, ChangeEvent } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  FormControlProps,
} from '@mui/material';

interface RadioGroupFieldProps extends Omit<FormControlProps, 'onChange'> {
  title: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  row?: boolean;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  title,
  value,
  onChange,
  children,
  error = false,
  helperText = '',
  required = false,
  row = false,
  ...props
}) => {
  return (
    <FormControl error={error} required={required} {...props}>
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup value={value} onChange={onChange} row={row}>
        {children}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroupField;
