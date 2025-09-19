import React, { ChangeEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface TextInputProps extends Omit<TextFieldProps, 'onChange'> {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  fullWidth?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  placeholder = '',
  required = false,
  disabled = false,
  type = 'text',
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      {...props}
    />
  );
};

export default TextInput;
