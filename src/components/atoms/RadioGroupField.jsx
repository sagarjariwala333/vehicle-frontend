import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';

const RadioGroupField = ({
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

RadioGroupField.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  row: PropTypes.bool,
};

export default RadioGroupField;
