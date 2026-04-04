export const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const formatDateLabel = (date) => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { month: "long", day: "numeric" });
};

export const groupMessagesByDate = (messages) => {
  const groups = [];
  let currentLabel = null;

  messages?.forEach((msg) => {
    const label = formatDateLabel(msg.createdAt);
    if (label !== currentLabel) {
      groups.push({ type: "label", label });
      currentLabel = label;
    }
    groups.push({ type: "message", msg });
  });

  return groups;
};
