// Constants
export const STORY_DURATION = 5000;
export const HOLD_DELAY = 150;
export const BASE_URL = "http://localhost:4000";

// Helpers
export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const avatar = (pic) =>
  pic
    ? `${BASE_URL}/uploads/${pic}`
    : `${BASE_URL}/uploads/default_profile.jpg`;

// LocalStorage seen tracking

const SEEN_KEY = "pronet_seen_stories";

export const isStorySeen = (id) => {
  try {
    return !!JSON.parse(localStorage.getItem(SEEN_KEY) || "{}")[id];
  } catch {
    return false;
  }
};

export const markLocalSeen = (id) => {
  try {
    const s = JSON.parse(localStorage.getItem(SEEN_KEY) || "{}");
    s[id] = true;
    localStorage.setItem(SEEN_KEY, JSON.stringify(s));
  } catch {}
};
