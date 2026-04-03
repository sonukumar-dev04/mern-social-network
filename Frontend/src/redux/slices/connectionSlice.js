import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// Find users (search)
export const findUser = createAsyncThunk(
  "connections/findUser",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        `/api/connections/find_user?query=${query}`,
        { withCredentials: true },
      );
      return data.users;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to find users",
      );
    }
  },
);

// Send connection request
export const sendConnectionRequest = createAsyncThunk(
  "connections/sendConnectionRequest",
  async (receiverId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/connections/send_connection_req",
        { receiverId },
        { withCredentials: true },
      );

      // Refresh sent requests from backend (source of truth)
      dispatch(getSentRequests());

      return data.connection;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to send request",
      );
    }
  },
);

// Get sent requests
export const getSentRequests = createAsyncThunk(
  "connections/getSentRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        "/api/connections/get_sent_reqs",
        { withCredentials: true },
      );
      return data.requests;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch sent requests",
      );
    }
  },
);

// Get pending requests
export const getPendingRequests = createAsyncThunk(
  "connections/getPendingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        "/api/connections/get_pending_reqs",
        { withCredentials: true },
      );
      return data.requests;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch pending requests",
      );
    }
  },
);

// Respond to request (accept/reject)
export const respondToRequest = createAsyncThunk(
  "connections/respondToRequest",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.put(
        `/api/connections/respond_to_connection/${id}`,
        { status },
        { withCredentials: true },
      );
      return data.connection;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to respond to request",
      );
    }
  },
);

// Get connection list
export const getConnectionsList = createAsyncThunk(
  "connections/getConnectionsList",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        `/api/connections/get_connections_list?userId=${userId}`,
        { withCredentials: true },
      );
      return data.connections;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch connections list",
      );
    }
  },
);

// Remove connection
export const removeConnection = createAsyncThunk(
  "connections/removeConnection",
  async (id, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/api/connections/remove_connection/${id}`, {
        withCredentials: true,
      });

      // Return connection document id
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to remove connection",
      );
    }
  },
);

const connectionSlice = createSlice({
  name: "connections",
  initialState: {
    users: [],
    pendingRequests: [],
    sentRequests: [],
    connections: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // findUser
      .addCase(findUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // sendConnectionRequest
      .addCase(sendConnectionRequest.fulfilled, (state) => {})

      // getPendingRequests
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.pendingRequests = action.payload;
      })

      // getSentRequests
      .addCase(getSentRequests.fulfilled, (state, action) => {
        state.sentRequests = action.payload;
      })

      // respondToRequest
      .addCase(respondToRequest.fulfilled, (state, action) => {
        // Remove from pending
        state.pendingRequests = state.pendingRequests.filter(
          (req) => req._id !== action.payload._id,
        );

        // Remove from sent (safety cleanup)
        state.sentRequests = state.sentRequests.filter(
          (req) => req._id !== action.payload._id,
        );
      })

      // getConnectionsList
      .addCase(getConnectionsList.fulfilled, (state, action) => {
        state.connections = action.payload;
      })

      // removeConnection
      .addCase(removeConnection.fulfilled, (state, action) => {
        state.connections = state.connections.filter(
          (conn) => conn.connectionId !== action.payload,
        );
      })

      // Loading & Error Handlers
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        },
      );
  },
});

export default connectionSlice.reducer;
