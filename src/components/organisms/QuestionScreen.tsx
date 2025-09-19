import React, { ReactNode } from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';
import { NavigationBar } from '../molecules';

interface QuestionScreenProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextLoading?: boolean;
  nextDisabled?: boolean;
  showBackButton?: boolean;
  error?: string;
  showProgressDots?: boolean;
  progressDotsSize?: 'small' | 'medium' | 'large';
  showProgressNumbers?: boolean;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  title,
  subtitle,
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  nextLoading = false,
  nextDisabled = false,
  showBackButton = true,
  error,
  showProgressDots = true,
  progressDotsSize = 'medium',
  showProgressNumbers = false,
}) => {
  return (
    <Box sx={{ py: 4, px: 2, width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {/* Header Section */}
        <Box mb={4}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 600, color: 'primary.main' }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Error Alert */}
        {error && (
          <Box mb={3}>
            <Alert severity="error" sx={{ borderRadius: 1 }}>
              {error}
            </Alert>
          </Box>
        )}

        {/* Content Section */}
        <Box flex={1} mb={4}>
          {children}
        </Box>

        {/* Navigation Section */}
        <Box mt="auto">
          <NavigationBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={onNext}
            onBack={onBack}
            nextLabel={nextLabel}
            backLabel={backLabel}
            nextLoading={nextLoading}
            nextDisabled={nextDisabled}
            showBackButton={showBackButton}
            showProgressDots={showProgressDots}
            progressDotsSize={progressDotsSize}
            showProgressNumbers={showProgressNumbers}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default QuestionScreen;
