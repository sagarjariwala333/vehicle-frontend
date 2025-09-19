import React, { ChangeEvent } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DateInput, ErrorMessage } from '../atoms';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  startDateError?: string;
  endDateError?: string;
  generalError?: string;
  disabled?: boolean;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  title?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startDateError,
  endDateError,
  generalError,
  disabled = false,
  required = true,
  minDate,
  maxDate,
  title = 'Select Date Range',
}) => {
  // Validate that end date is after start date
  const isEndDateValid =
    !startDate || !endDate || new Date(endDate) >= new Date(startDate);

  return (
    <Box>
      <Typography variant="h6" component="legend" gutterBottom>
        {title}
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ width: '100%' }}
      >
        <Box sx={{ flex: 1 }}>
          <DateInput
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
            error={!!startDateError}
            helperText={startDateError}
            required={required}
            disabled={disabled}
            minDate={minDate}
            maxDate={endDate || maxDate}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DateInput
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
            error={!!endDateError || !isEndDateValid}
            helperText={
              endDateError ||
              (!isEndDateValid ? 'End date must be after start date' : '')
            }
            required={required}
            disabled={disabled}
            minDate={startDate || minDate}
            maxDate={maxDate}
            fullWidth
          />
        </Box>
      </Stack>
      {(generalError || startDateError || endDateError || !isEndDateValid) && (
        <Box mt={1}>
          {generalError && (
            <ErrorMessage message={generalError} variant="text" />
          )}
          {!isEndDateValid && startDate && endDate && (
            <ErrorMessage
              message="End date must be after or equal to start date"
              variant="text"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default DateRangePicker;
