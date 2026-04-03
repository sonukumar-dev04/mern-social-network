import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (convoId, { rejectWithValue }) => {
    try {
      const res = await clientServer.get(`/api/messages/message/${convoId}`);
      return res.data.messages;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await clientServer.post("/api/messages/send_message", data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { clearMessages, receiveMessage } = messageSlice.actions;
export default messageSlice.reducer;
