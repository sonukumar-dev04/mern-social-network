import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

export const getConversations = createAsyncThunk(
  "conversation/getConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await clientServer.get("/api/conversations/get_conversation");
      return res.data.conversations;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addConversation = createAsyncThunk(
  "conversation/addConversation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await clientServer.post(
        "/api/conversations/add_conversation",
        data,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateLastMessage: (state, action) => {
      const { conversationId, lastMessage } = action.payload;
      const index = state.conversations.findIndex(
        (c) => c._id === conversationId,
      );
      if (index !== -1) {
        state.conversations[index].lastMessage = lastMessage;
        const updated = state.conversations.splice(index, 1)[0];
        state.conversations.unshift(updated);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
      });
  },
});

export const { updateLastMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
