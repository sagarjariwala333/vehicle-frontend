import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { VehicleType, VehicleModel, ApiState } from '../types';

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

// Mock API functions (replace with real API calls)
const mockVehicleTypesApi = async (): Promise<VehicleType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: '1', name: 'Motorcycle', wheels: 2 },
    { id: '2', name: 'Scooter', wheels: 2 },
    { id: '3', name: 'Sedan', wheels: 4 },
    { id: '4', name: 'SUV', wheels: 4 },
    { id: '5', name: 'Truck', wheels: 4 },
  ];
};

const mockVehicleModelsApi = async (
  typeId: string
): Promise<VehicleModel[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const allModels = [
    { id: '1', name: 'Honda CBR600RR', typeId: '1' },
    { id: '2', name: 'Yamaha YZF-R6', typeId: '1' },
    { id: '3', name: 'Honda PCX 150', typeId: '2' },
    { id: '4', name: 'Vespa Primavera', typeId: '2' },
    { id: '5', name: 'Toyota Camry', typeId: '3' },
    { id: '6', name: 'Honda Accord', typeId: '3' },
    { id: '7', name: 'Toyota RAV4', typeId: '4' },
    { id: '8', name: 'Honda CR-V', typeId: '4' },
    { id: '9', name: 'Ford F-150', typeId: '5' },
    { id: '10', name: 'Chevrolet Silverado', typeId: '5' },
  ];
  return allModels.filter((model) => model.typeId === typeId);
};

// Async thunks for API calls
export const fetchVehicleTypes = createAsyncThunk(
  'vehicles/fetchTypes',
  async (_, { rejectWithValue }) => {
    try {
      const types = await mockVehicleTypesApi();
      return types;
    } catch (error) {
      console.error('Failed to fetch vehicle types:', error);
      return rejectWithValue('Failed to fetch vehicle types');
    }
  }
);

export const fetchVehicleModels = createAsyncThunk(
  'vehicles/fetchModels',
  async (typeId: string, { rejectWithValue }) => {
    try {
      const models = await mockVehicleModelsApi(typeId);
      return models;
    } catch (error) {
      console.error('Failed to fetch vehicle models:', error);
      return rejectWithValue('Failed to fetch vehicle models');
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
