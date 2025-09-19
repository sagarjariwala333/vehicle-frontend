import { FormControlLabel, Radio } from '@mui/material';
import PropTypes from 'prop-types';

const RadioOption = ({
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

RadioOption.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default RadioOption;
