import { Alert, Typography } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ErrorMessage = ({
  message,
  variant = 'text',
  severity = 'error',
  showIcon = true,
  ...props
}) => {
  if (variant === 'alert') {
    return (
      <Alert
        severity={severity}
        icon={showIcon ? <ErrorIcon /> : false}
        {...props}
      >
        {message}
      </Alert>
    );
  }

  return (
    <Typography
      variant="body2"
      color="error"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        mt: 0.5,
      }}
      {...props}
    >
      {showIcon && <ErrorIcon fontSize="small" />}
      {message}
    </Typography>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['text', 'alert']),
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  showIcon: PropTypes.bool,
};

export default ErrorMessage;
