import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// ✅ 1. Fetch all posts (feed)
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get("/api/posts/getAllPosts");
      return data.posts;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch posts",
      );
    }
  },
);

// ✅ 2. Fetch posts of a specific user
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(
        `/api/posts/getUserPosts/${userId}`,
      );
      return data.posts;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user posts",
      );
    }
  },
);

// ✅ 3. Create new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post("/api/posts/post", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create post",
      );
    }
  },
);

// ✅ 4. Toggle like
export const toggleLikePost = createAsyncThunk(
  "posts/toggleLikePost",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.put(
        `/api/posts/post/${postId}/like`,
        {},
        { withCredentials: true },
      );
      return { postId, likes: data.likes, likesCount: data.likesCount };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle like",
      );
    }
  },
);

// ✅ 5. Get single post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(`/api/posts/getPost/${postId}`);
      return data.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch post",
      );
    }
  },
);

// ✅ 6. Delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/api/posts/delete_post/${postId}`, {
        withCredentials: true,
      });
      return postId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete post",
      );
    }
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    singlePost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUserPosts
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })

      // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload); 
      })

      // toggleLikePost
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload.postId);
        if (post) {
          post.likes = action.payload.likes;
        }
      })

      // fetchPostById
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.singlePost = action.payload;
        const index = state.posts.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        } else {
          state.posts.unshift(action.payload);
        }
      })

      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
