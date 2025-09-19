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
  },
});

export const { clearVehicleTypes, clearVehicleModels, clearVehicleErrors } =
  vehiclesSlice.actions;

export default vehiclesSlice.reducer;
