import React from 'react';
import { Alert, Typography, AlertProps, TypographyProps } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  variant?: 'text' | 'alert';
  severity?: 'error' | 'warning' | 'info' | 'success';
  showIcon?: boolean;
}

type CombinedProps = ErrorMessageProps & (AlertProps | TypographyProps);

const ErrorMessage: React.FC<CombinedProps> = ({
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
        {...(props as AlertProps)}
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
      {...(props as TypographyProps)}
    >
      {showIcon && <ErrorIcon fontSize="small" />}
      {message}
    </Typography>
  );
};

export default ErrorMessage;
