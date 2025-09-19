import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
  showNumbers?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({
  currentStep,
  totalSteps,
  showNumbers = false,
  size = 'medium',
  color = 'primary',
}) => {
  const dotSize = size === 'small' ? 8 : size === 'large' ? 16 : 12;
  const spacing = size === 'small' ? 1 : size === 'large' ? 2 : 1.5;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={spacing}
      py={2}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <Box
            key={stepNumber}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: dotSize * 2,
              height: dotSize * 2,
              borderRadius: '50%',
              backgroundColor:
                isActive || isCompleted ? `${color}.main` : 'grey.300',
              color: isActive || isCompleted ? 'white' : 'grey.600',
              transition: 'all 0.3s ease',
              transform: isActive ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {showNumbers && (
              <Typography
                variant="caption"
                sx={{
                  fontSize:
                    size === 'small'
                      ? '0.6rem'
                      : size === 'large'
                        ? '0.9rem'
                        : '0.75rem',
                  fontWeight: 600,
                }}
              >
                {stepNumber}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ProgressDots;
