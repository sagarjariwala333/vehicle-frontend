import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, FormErrors } from '../types';

interface FormState {
  data: FormData;
  errors: FormErrors;
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  isDirty: boolean;
}

const initialState: FormState = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    numberOfWheels: '',
    vehicleType: '',
    vehicleModel: '',
    startDate: '',
    endDate: '',
  },
  errors: {},
  currentStep: 1,
  totalSteps: 6,
  isValid: false,
  isDirty: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.data[field] = value;
      state.isDirty = true;

      // Clear field-specific error when user starts typing
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },

    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.data = { ...state.data, ...action.payload };
      state.isDirty = true;
    },

    setFormErrors: (state, action: PayloadAction<FormErrors>) => {
      state.errors = action.payload;
      state.isValid = Object.keys(action.payload).length === 0;
    },

    clearFormErrors: (state) => {
      state.errors = {};
      state.isValid = true;
    },

    clearFieldError: (state, action: PayloadAction<keyof FormErrors>) => {
      delete state.errors[action.payload];
    },

    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },

    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    resetForm: (state) => {
      state.data = initialState.data;
      state.errors = {};
      state.currentStep = 1;
      state.isValid = false;
      state.isDirty = false;
    },

    setFormValid: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload;
    },

    // Reset dependent fields when parent selections change
    resetVehicleType: (state) => {
      state.data.vehicleType = '';
      state.data.vehicleModel = '';
      delete state.errors.vehicleType;
      delete state.errors.vehicleModel;
    },

    resetVehicleModel: (state) => {
      state.data.vehicleModel = '';
      delete state.errors.vehicleModel;
    },
  },
});

export const {
  updateFormField,
  updateFormData,
  setFormErrors,
  clearFormErrors,
  clearFieldError,
  setCurrentStep,
  nextStep,
  previousStep,
  resetForm,
  setFormValid,
  resetVehicleType,
  resetVehicleModel,
} = formSlice.actions;

export default formSlice.reducer;
