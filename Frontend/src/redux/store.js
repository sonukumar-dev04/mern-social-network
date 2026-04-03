import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import commentReducer from "./slices/commentSlice";
import connectionReducer from "./slices/connectionSlice";
import notificationReducer from "./slices/notificationSlice";
import conversationReducer from "./slices/conversationSlice";
import messageReducer from "./slices/messageSlice";
import storyReducer from "./slices/storySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
    comments: commentReducer,
    connections: connectionReducer,
    notifications: notificationReducer,
    conversation: conversationReducer,
    message: messageReducer,
    stories: storyReducer,
  },
});
