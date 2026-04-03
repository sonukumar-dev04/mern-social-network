import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// ✅ 1. Get all stories grouped by user
export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get("/api/stories");
      return data.stories;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch stories",
      );
    }
  },
);

// ✅ 2. Create image story
export const createImageStory = createAsyncThunk(
  "stories/createImageStory",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/stories/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return data.story;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create story",
      );
    }
  },
);

// ✅ 3. Create text story
export const createTextStory = createAsyncThunk(
  "stories/createTextStory",
  async (storyData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/stories/create",
        storyData,
        {
          withCredentials: true,
        },
      );
      return data.story;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create story",
      );
    }
  },
);

// ✅ 4. Mark story as seen
export const markStorySeen = createAsyncThunk(
  "stories/markStorySeen",
  async ({ storyId, groupUserId }, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.put(
        `/api/stories/${storyId}/seen`,
        {},
        { withCredentials: true },
      );
      return { storyId, groupUserId, seenBy: data.seenBy };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark seen",
      );
    }
  },
);

// ✅ 5. Delete story
export const deleteStory = createAsyncThunk(
  "stories/deleteStory",
  async (storyId, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/api/stories/${storyId}`, {
        withCredentials: true,
      });
      return storyId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete story",
      );
    }
  },
);

const storySlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchStories
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createImageStory
      .addCase(createImageStory.fulfilled, (state, action) => {
        const newStory = action.payload;
        const userId = newStory.user._id;
        const existing = state.stories.find((g) => g.user._id === userId);
        if (existing) {
          existing.stories.unshift(newStory);
        } else {
          state.stories.unshift({ user: newStory.user, stories: [newStory] });
        }
      })

      // createTextStory
      .addCase(createTextStory.fulfilled, (state, action) => {
        const newStory = action.payload;
        const userId = newStory.user._id;
        const existing = state.stories.find((g) => g.user._id === userId);
        if (existing) {
          existing.stories.unshift(newStory);
        } else {
          state.stories.unshift({ user: newStory.user, stories: [newStory] });
        }
      })

      // markStorySeen — update seenBy on the specific story
      .addCase(markStorySeen.fulfilled, (state, action) => {
        const { storyId, groupUserId, seenBy } = action.payload;
        const group = state.stories.find((g) => g.user._id === groupUserId);
        if (group) {
          const story = group.stories.find((s) => s._id === storyId);
          if (story) {
            story.seenBy = seenBy;
          }
        }
      })

      // deleteStory
      .addCase(deleteStory.fulfilled, (state, action) => {
        const storyId = action.payload;
        state.stories = state.stories
          .map((g) => ({
            ...g,
            stories: g.stories.filter((s) => s._id !== storyId),
          }))
          .filter((g) => g.stories.length > 0);
      });
  },
});

export default storySlice.reducer;
