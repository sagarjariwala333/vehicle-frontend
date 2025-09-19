// Form Data Types
export interface FormData {
  firstName: string;
  lastName: string;
  numberOfWheels: string;
  vehicleType: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
}

// Vehicle Types
export interface VehicleType {
  id: string;
  name: string;
  wheels: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleModel {
  id: string;
  type_id: string;
  model_name: string;
  registration_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  vehicle_type?: VehicleType;
}

// Form Validation Errors
export interface FormErrors {
  firstName?: string;
  lastName?: string;
  numberOfWheels?: string;
  vehicleType?: string;
  vehicleModel?: string;
  startDate?: string;
  endDate?: string;
  general?: string;
}

// API States
export interface ApiState {
  loading: boolean;
  error: string | null;
}

// User State
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

// Booking State
export interface Booking {
  id: string;
  userId: string;
  formData: FormData;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// UI State
export interface UiState {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  showSuccessMessage: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}
