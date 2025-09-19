import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextInput = ({
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

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default TextInput;
