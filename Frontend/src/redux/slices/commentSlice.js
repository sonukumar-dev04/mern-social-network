import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "../../config/axios";

// 1. Add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, commentBody }, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.post(
        "/api/comments/post_comment",
        { postId, commentBody },
        { withCredentials: true },
      );
      return data.comment;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to add comment",
      );
    }
  },
);

// 2. Get comments by postId
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await clientServer.get(`/api/comments/comment/${postId}`);
      return { postId, comments: data.comments };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch comments",
      );
    }
  },
);

// 3. Delete comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await clientServer.delete(`/api/comments/comment/${commentId}`, {
        withCredentials: true,
      });
      return commentId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to delete comment",
      );
    }
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commentsByPost: {}, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // addComment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        const postId = comment.postId;
        if (!state.commentsByPost[postId]) {
          state.commentsByPost[postId] = [];
        }
        state.commentsByPost[postId].unshift(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchCommentsByPostId
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        state.commentsByPost[postId] = comments;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteComment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload;
        for (const postId in state.commentsByPost) {
          state.commentsByPost[postId] = state.commentsByPost[postId].filter(
            (c) => c._id !== commentId,
          );
        }
      });
  },
});

export default commentSlice.reducer;
