import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// GET ALL NOTIFICATIONS
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        "/api/notifications/notification",
      );
      return data.notification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching notifications",
      );
    }
  },
);

// MARK AS READ
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.put(
        `/api/notifications/${notificationId}/read`,
      );
      return data.notification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Error updating notification",
      );
    }
  },
);

// GET UNREAD COUNT
export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        "/api/notifications/activeNotification",
      );
      return data.count;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching count",
      );
    }
  },
);

// INITIAL STATE
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// SLICE
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MARK AS READ
      .addCase(markAsRead.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.notifications.findIndex(
          (n) => n._id === updated._id,
        );

        if (index !== -1) {
          state.notifications[index] = updated;
        }

        if (state.unreadCount > 0) {
          state.unreadCount -= 1;
        }
      })

      // UNREAD COUNT
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
