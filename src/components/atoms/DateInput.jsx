import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const DateInput = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  fullWidth = true,
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        min: minDate,
        max: maxDate,
      }}
      {...props}
    />
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
};

export default DateInput;
