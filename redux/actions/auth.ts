import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/buildingManager/auth/login`, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue, getState }: any) => {
    try {
      const token = getState().auth.token;
      const res = await axios.post(
        `${API_BASE_URL}/buildingManager/auth/profile`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (
    payload: { firstName?: { en: string }; phoneNumber?: string },
    { rejectWithValue, getState }: any
  ) => {
    try {
      const token = getState().auth.token;
      const res = await axios.post(
        `${API_BASE_URL}/buildingManager/auth/profile/edit`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    payload: { email: string; domainId: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/buildingManager/auth/verify`, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: { email: string; domainId: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/auth/forgot-password`, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: { password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/auth/reset-password`, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
