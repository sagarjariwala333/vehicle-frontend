import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import reducers
import formReducer from './slices/formSlice';
import vehiclesReducer from './slices/vehiclesSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';

// Import actions
import {
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
} from './slices/formSlice';

import {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setSubmitting,
  showSuccess,
  hideSuccess,
  addNotification,
  removeNotification,
  clearNotifications,
} from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    vehicles: vehiclesReducer,
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: true, // Enable Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selectors
export const selectFormData = (state: RootState) => state.form.data;
export const selectFormErrors = (state: RootState) => state.form.errors;
export const selectCurrentStep = (state: RootState) => state.form.currentStep;
export const selectFormIsValid = (state: RootState) => state.form.isValid;
export const selectFormIsDirty = (state: RootState) => state.form.isDirty;

export const selectVehicleTypes = (state: RootState) =>
  state.vehicles.types.data;
export const selectVehicleTypesLoading = (state: RootState) =>
  state.vehicles.types.loading;
export const selectVehicleTypesError = (state: RootState) =>
  state.vehicles.types.error;

export const selectVehicleModels = (state: RootState) =>
  state.vehicles.models.data;
export const selectVehicleModelsLoading = (state: RootState) =>
  state.vehicles.models.loading;
export const selectVehicleModelsError = (state: RootState) =>
  state.vehicles.models.error;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectIsSubmitting = (state: RootState) => state.ui.isSubmitting;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectShowSuccessMessage = (state: RootState) =>
  state.ui.showSuccessMessage;
export const selectSuccessMessage = (state: RootState) =>
  state.ui.successMessage;

// Filtered selectors
export const selectFilteredVehicleTypes =
  (numberOfWheels?: number) => (state: RootState) => {
    const types = selectVehicleTypes(state);
    // Ensure types is an array before filtering
    if (!Array.isArray(types)) return [];
    if (!numberOfWheels) return types;
    return types.filter((type) => type.wheels === numberOfWheels);
  };

export const selectFilteredVehicleModels =
  (typeId?: string) => (state: RootState) => {
    const models = selectVehicleModels(state);
    // Ensure models is an array before filtering
    if (!Array.isArray(models)) return [];
    if (!typeId) return models;
    return models.filter((model) => model.type_id === typeId);
  };

// Export actions
export {
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
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setSubmitting,
  showSuccess,
  hideSuccess,
  addNotification,
  removeNotification,
  clearNotifications,
};

export default store;
