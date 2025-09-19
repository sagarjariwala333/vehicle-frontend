import { Button, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const PrimaryButton = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = 'contained',
  size = 'large',
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      endIcon={!loading ? endIcon : null}
      className={className}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        py: 1.5,
        px: 3,
        ...props.sx,
      }}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default PrimaryButton;
