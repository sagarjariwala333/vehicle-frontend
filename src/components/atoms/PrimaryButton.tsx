import React, { ReactNode, MouseEvent } from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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

export default PrimaryButton;
