import { createAsyncThunk } from '@reduxjs/toolkit';

const BASEURL=process.env.NEXT_PUBLIC_API_URL

export interface Name {
  en: string;
  ar?: string;
}

export interface Address {
  city: string;
  area?: string;
  street?: string;
}

export interface Landlord {
  id: string;
  firstName: Name;
  lastName: Name;
  email: string;
  phoneNumber: string;
  homeAddress: Address;
  deliveryAddress: Address;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface LandlordListResponse {
  count: number;
  rows: Landlord[];
}

export interface LandlordResponse {
  id: string;
  firstName: Name;
  lastName: Name;
  email: string;
  phoneNumber: string;
  homeAddress: Address;
  deliveryAddress: Address;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}


// List Landlords
export const listLandlords = createAsyncThunk<LandlordListResponse,{ limit?: number; offset?: number }, { rejectValue: string }>
('landlord/list', async (params, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASEURL}/buildingManager/landlord/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params), 
    });
    const json: ApiResponse<LandlordListResponse> = await response.json();
    if (!json.success || !json.data) return rejectWithValue(json.message || 'Failed to fetch landlords');
    return json.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// Add Landlord
export const addLandlord = createAsyncThunk<LandlordResponse,
  {
    firstName: Name;
    lastName: Name;
    email: string;
    phoneNumber: string;
    homeAddress: Address;
    deliveryAddress: Address;
  },
  { rejectValue: string }
>('landlord/add', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASEURL}/buildingManager/landlord/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<LandlordResponse> = await response.json();
    if (!json.success || !json.data) return rejectWithValue(json.message || 'Failed to add landlord');
    return json.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// Edit Landlord
export const editLandlord = createAsyncThunk<
  LandlordResponse,
  {
    landlordId: string;
    firstName?: Name;
    lastName?: Name;
    email?: string;
    phoneNumber?: string;
    homeAddress?: Partial<Address>;
    deliveryAddress?: Partial<Address>;
    password?: string;
  },
  { rejectValue: string }
>('landlord/edit', async (data, { rejectWithValue }) => {
  try {
    const { landlordId, ...payload } = data;
    const response = await fetch(`${BASEURL}/buildingManager/landlord/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landlordId, ...payload }),
    });
    const json: ApiResponse<LandlordResponse> = await response.json();
    if (!json.success || !json.data) return rejectWithValue(json.message || 'Failed to edit landlord');
    return json.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// Remove Landlord
export const removeLandlord = createAsyncThunk<
  string,
  { landlordId: string },
  { rejectValue: string }
>('landlord/remove', async ({ landlordId }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASEURL}/buildingManager/landlord/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landlordId }),
    });
    const json: ApiResponse<null> = await response.json();
    if (!json.success) return rejectWithValue(json.message || 'Failed to remove landlord');
    return landlordId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// Connect Property
export const connectPropertyToLandlord = createAsyncThunk<
  string,
  { userId: string; propertyId: string },
  { rejectValue: string }
>('landlord/connectProperty', async ({ userId, propertyId }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASEURL}/buildingManager/landlord/property/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, propertyId }),
    });
    const json: { message?: string } = await response.json();
    if (!json.message?.includes('success')) return rejectWithValue('Failed to link property');
    return json.message;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Network error');
  }
});