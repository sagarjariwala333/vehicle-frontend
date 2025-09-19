import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Types
export interface VehicleType {
  id: string;
  name: string;
  wheels: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  type_id: string;
  model_name: string;
  registration_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  vehicle_type?: VehicleType;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  user?: User;
  vehicle?: Vehicle;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  firstName: string;
  lastName: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
}

// Backend API Response Format
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// API Functions
export const vehicleTypesAPI = {
  getAll: () => api.get<ApiResponse<VehicleType[]>>('/vehicle-types'),
  getByWheels: (wheels: number) =>
    api.get<ApiResponse<VehicleType[]>>(`/vehicle-types/wheels/${wheels}`),
  getById: (id: string) =>
    api.get<ApiResponse<VehicleType>>(`/vehicle-types/${id}`),
};

export const vehiclesAPI = {
  getAll: () => api.get<ApiResponse<Vehicle[]>>('/vehicles'),
  getByType: (typeId: string) =>
    api.get<ApiResponse<Vehicle[]>>(`/vehicles/type/${typeId}`),
  getById: (id: string) => api.get<ApiResponse<Vehicle>>(`/vehicles/${id}`),
  checkAvailability: (id: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.get<
      ApiResponse<{ available: boolean; conflictingBookings?: Booking[] }>
    >(`/vehicles/${id}/availability${query}`);
  },
};

export const usersAPI = {
  getAll: () => api.get<ApiResponse<User[]>>('/users'),
  getById: (id: string) => api.get<ApiResponse<User>>(`/users/${id}`),
  create: (userData: { firstName: string; lastName: string; email?: string }) =>
    api.post<ApiResponse<User>>('/users', userData),
  checkEmailAvailability: (email: string) =>
    api.get<ApiResponse<{ available: boolean }>>(`/users/check-email/${email}`),
};

export const bookingsAPI = {
  getAll: () => api.get<ApiResponse<Booking[]>>('/bookings'),
  getById: (id: string) => api.get<ApiResponse<Booking>>(`/bookings/${id}`),
  create: (bookingData: CreateBookingRequest) =>
    api.post<ApiResponse<Booking>>('/bookings', bookingData),
  update: (id: string, bookingData: Partial<CreateBookingRequest>) =>
    api.put<ApiResponse<Booking>>(`/bookings/${id}`, bookingData),
  cancel: (id: string) =>
    api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`),
  delete: (id: string) => api.delete(`/bookings/${id}`),
};

export default api;
