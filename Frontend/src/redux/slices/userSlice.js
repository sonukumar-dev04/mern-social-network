import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// ✅ 1. Update profile/cover pictures
export const updatePictures = createAsyncThunk(
  "user/updatePictures",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.put(
        "/api/users/update_pictures",
        formData,
        {
          withCredentials: true,
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update pictures",
      );
    }
  },
);

// ✅ 2. Update user basic info
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/users/user_update",
        formData,
        {
          withCredentials: true,
        },
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update user profile",
      );
    }
  },
);

// ✅ 3. Get logged-in user + profile
export const getUserAndProfile = createAsyncThunk(
  "user/getUserAndProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        "/api/users/get_user_and_profile",
        {
          withCredentials: true,
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user and profile",
      );
    }
  },
);

// ✅ 4. Update profile data
export const updateProfileData = createAsyncThunk(
  "user/updateProfileData",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/users/update_profile_data",
        formData,
        { withCredentials: true },
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile data",
      );
    }
  },
);

// ✅ 5. Get all user profiles
export const getAllUserProfiles = createAsyncThunk(
  "user/getAllUserProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get("/api/users/get_all_users");
      return data.users;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch all users",
      );
    }
  },
);

// ✅ 6. Get user profile by ID
export const getUserProfileById = createAsyncThunk(
  "user/getUserProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(`/api/users/user/${id}`);
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user profile",
      );
    }
  },
);

// ✅ 7. Download resume (PDF path)
export const downloadResume = createAsyncThunk(
  "user/downloadResume",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        `/api/users/download_resume?id=${id}`,
      );
      return data.message; // PDF file path
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to download resume",
      );
    }
  },
);

// ✅ 8. Update both user and profile data together
export const updateUserAndProfile = createAsyncThunk(
  "user/updateUserAndProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/users/update_profile", // <-- combined route
        formData,
        { withCredentials: true },
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update user and profile",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    allUsers: [],
    singleUser: null,
    loading: false,
    error: null,
    message: null,
    resumePath: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUserAndProfile
      .addCase(getUserAndProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAndProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserAndProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updatePictures
      .addCase(updatePictures.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // updateUserProfile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      // updateProfileData
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      // getAllUserProfiles
      .addCase(getAllUserProfiles.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })

      // getUserProfileById
      .addCase(getUserProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // downloadResume
      .addCase(downloadResume.fulfilled, (state, action) => {
        state.resumePath = action.payload;
      })

      // updateUserAndProfile
      .addCase(updateUserAndProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAndProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateUserAndProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
