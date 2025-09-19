import React from 'react';
import { Box, CircularProgress, Typography, BoxProps } from '@mui/material';

interface LoaderProps extends BoxProps {
  size?: number;
  message?: string;
  showMessage?: boolean;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  message = 'Loading...',
  showMessage = true,
  variant = 'indeterminate',
  color = 'primary',
  fullScreen = false,
  ...props
}) => {
  const LoaderComponent = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      {...props}
    >
      <CircularProgress size={size} color={color} variant={variant} />
      {showMessage && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(255, 255, 255, 0.8)"
        zIndex={9999}
      >
        {LoaderComponent}
      </Box>
    );
  }

  return LoaderComponent;
};

export default Loader;
