import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { VehicleType, VehicleModel, ApiState } from '../types';
import { vehicleTypesAPI, vehiclesAPI } from '../../services/api';

interface VehiclesState {
  types: {
    data: VehicleType[];
    loading: boolean;
    error: string | null;
  };
  models: {
    data: VehicleModel[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: VehiclesState = {
  types: {
    data: [],
    loading: false,
    error: null,
  },
  models: {
    data: [],
    loading: false,
    error: null,
  },
};

// Async thunks for API calls
export const fetchVehicleTypes = createAsyncThunk(
  'vehicles/fetchTypes',
  async (wheels?: number, { rejectWithValue }) => {
    try {
      const response = wheels
        ? await vehicleTypesAPI.getByWheels(wheels)
        : await vehicleTypesAPI.getAll();
      // Extract data from the API response format {success: true, data: [...]}
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to fetch vehicle types:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch vehicle types'
      );
    }
  }
);

export const fetchVehicleModels = createAsyncThunk(
  'vehicles/fetchModels',
  async (typeId: string, { rejectWithValue }) => {
    try {
      const response = await vehiclesAPI.getByType(typeId);
      // Extract data from the API response format {success: true, data: [...]}
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to fetch vehicle models:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch vehicle models'
      );
    }
  }
);

export const fetchAvailableVehicleModels = createAsyncThunk(
  'vehicles/fetchAvailableModels',
  async (
    params: { typeId: string; startDate: string; endDate: string },
    { rejectWithValue }
  ) => {
    try {
      // First get all vehicles of the type
      const response = await vehiclesAPI.getByType(params.typeId);
      const allVehicles = response.data.data || response.data;

      // Then check availability for each vehicle
      const availableVehicles = [];
      for (const vehicle of allVehicles) {
        try {
          const availabilityResponse = await vehiclesAPI.checkAvailability(
            vehicle.id,
            params.startDate,
            params.endDate
          );
          if (availabilityResponse.data.data?.available) {
            availableVehicles.push(vehicle);
          }
        } catch {
          // If availability check fails, assume vehicle is not available
          console.warn(
            `Could not check availability for vehicle ${vehicle.id}`
          );
        }
      }

      return availableVehicles;
    } catch (error: any) {
      console.error('Failed to fetch available vehicle models:', error);
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch available vehicle models'
      );
    }
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    clearVehicleTypes: (state) => {
      state.types.data = [];
      state.types.error = null;
    },

    clearVehicleModels: (state) => {
      state.models.data = [];
      state.models.error = null;
    },

    clearVehicleErrors: (state) => {
      state.types.error = null;
      state.models.error = null;
    },
  },
  extraReducers: (builder) => {
    // Vehicle Types
    builder
      .addCase(fetchVehicleTypes.pending, (state) => {
        state.types.loading = true;
        state.types.error = null;
      })
      .addCase(fetchVehicleTypes.fulfilled, (state, action) => {
        state.types.loading = false;
        state.types.data = action.payload;
        state.types.error = null;
      })
      .addCase(fetchVehicleTypes.rejected, (state, action) => {
        state.types.loading = false;
        state.types.error = action.payload as string;
      });

    // Vehicle Models
    builder
      .addCase(fetchVehicleModels.pending, (state) => {
        state.models.loading = true;
        state.models.error = null;
      })
      .addCase(fetchVehicleModels.fulfilled, (state, action) => {
        state.models.loading = false;
        state.models.data = action.payload;
        state.models.error = null;
      })
      .addCase(fetchVehicleModels.rejected, (state, action) => {
        state.models.loading = false;
        state.models.error = action.payload as string;
      });

    // Available Vehicle Models
    builder
      .addCase(fetchAvailableVehicleModels.pending, (state) => {
        state.models.loading = true;
        state.models.error = null;
      })
      .addCase(fetchAvailableVehicleModels.fulfilled, (state, action) => {
        state.models.loading = false;
        state.models.data = action.payload;
        state.models.error = null;
      })
      .addCase(fetchAvailableVehicleModels.rejected, (state, action) => {
        state.models.loading = false;
        state.models.error = action.payload as string;
      });
  },
});

export const { clearVehicleTypes, clearVehicleModels, clearVehicleErrors } =
  vehiclesSlice.actions;

export default vehiclesSlice.reducer;
