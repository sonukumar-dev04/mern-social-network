export const BASE_URL = "http://localhost:4000";

export const getAvatar = (profilePicture) =>
  profilePicture
    ? `${BASE_URL}/uploads/${profilePicture}`
    : `${BASE_URL}/uploads/default_profile.jpg`;
