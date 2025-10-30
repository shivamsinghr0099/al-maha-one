import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Landlord,LandlordListResponse } from '../actions/landlord';
import {listLandlords, addLandlord, editLandlord, removeLandlord, connectPropertyToLandlord} from '../actions/landlord';

interface LandlordState {
  landlords: Landlord[];
  count: number;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
}

const initialState: LandlordState = {
  landlords: [],
  count: 0,
  loading: false,
  actionLoading: false,
  error: null,
};

const landlordSlice = createSlice({
  name: 'landlord',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // List
    builder
      .addCase(listLandlords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listLandlords.fulfilled, (state, action: PayloadAction<LandlordListResponse>) => {
        state.loading = false;
        state.landlords = action.payload.rows;
        state.count = action.payload.count;
      })
      .addCase(listLandlords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load landlords';
      });

    // Add
    builder
      .addCase(addLandlord.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addLandlord.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.landlords.push(action.payload);
        state.count += 1;
      })
      .addCase(addLandlord.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to add landlord';
      });

    // Edit
    builder
      .addCase(editLandlord.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(editLandlord.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.landlords.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.landlords[index] = action.payload;
        }
      })
      .addCase(editLandlord.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to edit landlord';
      });

    // Remove
    builder
      .addCase(removeLandlord.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeLandlord.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.landlords = state.landlords.filter((l) => l.id !== action.payload);
        state.count -= 1;
      })
      .addCase(removeLandlord.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to remove landlord';
      });

    // Connect Property
    builder
      .addCase(connectPropertyToLandlord.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(connectPropertyToLandlord.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(connectPropertyToLandlord.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to link property';
      });
  },
});

export const { clearError } = landlordSlice.actions;
export default landlordSlice.reducer;