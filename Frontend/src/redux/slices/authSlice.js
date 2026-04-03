import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post("/api/users/register", formData);
      return data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post("/api/users/login", credentials);
      return data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Logout user (calls backend logout route)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await clientServer.post("/api/users/logout"); // backend clears session
      return true;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Get current logged-in user
export const fetchSelf = createAsyncThunk(
  "auth/fetchSelf",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get("/api/users/self", {
        withCredentials: true, 
      });
      return data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to fetch user details";
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // Fetch self
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
