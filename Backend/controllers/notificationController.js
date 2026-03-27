import Notification from "../models/notification.js";

export const getNotification = async (req, res) => {
  try {
    let userId = req.user._id;
    let notification = await Notification.find({ receiver: userId })
      .sort({
        createdAt: -1,
      })
      .populate("sender receiver");

    return res.status(200).json({ notification });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const activeNotify = async (req, res) => {
  try {
    const userId = req.user._id;
    let notifications = await Notification.find({
      receiver: userId,
      isRead: false,
    });
    return res.status(200).json({
      count: notifications.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
