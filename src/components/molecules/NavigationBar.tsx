import React, { MouseEvent } from 'react';
import { Box, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { PrimaryButton, ProgressDots } from '../atoms';

interface NavigationBarProps {
  currentStep: number;
  totalSteps: number;
  onNext: (event: MouseEvent<HTMLButtonElement>) => void;
  onBack?: (event: MouseEvent<HTMLButtonElement>) => void;
  nextLabel?: string;
  backLabel?: string;
  nextLoading?: boolean;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  showBackButton?: boolean;
  showProgressDots?: boolean;
  progressDotsSize?: 'small' | 'medium' | 'large';
  showProgressNumbers?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  nextLoading = false,
  nextDisabled = false,
  backDisabled = false,
  showBackButton = true,
  showProgressDots = true,
  progressDotsSize = 'medium',
  showProgressNumbers = false,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <Box>
      {showProgressDots && (
        <ProgressDots
          currentStep={currentStep}
          totalSteps={totalSteps}
          size={progressDotsSize}
          showNumbers={showProgressNumbers}
        />
      )}

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        {showBackButton && !isFirstStep ? (
          <PrimaryButton
            onClick={onBack!}
            variant="outlined"
            startIcon={<ArrowBack />}
            disabled={backDisabled}
          >
            {backLabel}
          </PrimaryButton>
        ) : (
          <Box /> // Empty box to maintain spacing
        )}

        <PrimaryButton
          onClick={onNext}
          loading={nextLoading}
          disabled={nextDisabled}
          endIcon={!nextLoading ? <ArrowForward /> : null}
          variant="contained"
        >
          {isLastStep ? 'Submit' : nextLabel}
        </PrimaryButton>
      </Stack>
    </Box>
  );
};

export default NavigationBar;
