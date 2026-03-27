import Connection from "../models/connection.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";

export const findUser = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const search = query.trim();

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ],
    })
      .select("name username profilePicture")
      .limit(5)
      .sort({ name: 1 });

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("findUser error", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const sendConnectionRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.body;

    // Prevent sending request to self
    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot send a request to yourself" });
    }

    // Check if a connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { userId: senderId, connectionId: receiverId },
        { userId: receiverId, connectionId: senderId },
      ],
    });

    if (existingConnection) {
      if (existingConnection.status === null) {
        return res
          .status(400)
          .json({ error: "A request is already pending between you two" });
      }
      if (existingConnection.status === true) {
        return res.status(400).json({ error: "You are already connected" });
      }
    }

    // Ncreate new
    const newConnection = new Connection({
      userId: senderId,
      connectionId: receiverId,
      status: null,
    });

    await newConnection.save();

    // Notification on request send
    const sender = await User.findById(senderId);
    const content = `${sender.name} sent you a connection request`;
    const notification = new Notification({
      sender: senderId,
      receiver: receiverId,
      content,
      type: "friendRequest",
    });
    await notification.save();

    return res.status(201).json({
      message: "Connection request sent successfully",
      connection: newConnection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Get Sent Requests
export const getSentRequests = async (req, res) => {
  try {
    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const sentRequests = await Connection.find({
      userId: senderId,
      status: null,
    })
      .populate("connectionId", "name profilePicture profileId")
      .populate({
        path: "connectionId",
        populate: {
          path: "profileId",
          select: "currentPost currentCompany",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched sent requests successfully",
      requests: sentRequests || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Get Pending Requests
export const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const pendingRequests = await Connection.find({
      connectionId: userId,
      status: null,
    })
      .populate("userId", "name profilePicture profileId")
      .populate({
        path: "userId",
        populate: {
          path: "profileId",
          select: "currentPost currentCompany",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched pending requests successfully",
      requests: pendingRequests || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const respondToRequest = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { status } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    if (typeof status !== "boolean") {
      return res.status(400).json({
        error: "Invalid status: must be true (accept) or false (reject)",
      });
    }

    const connection = await Connection.findById(id).populate("userId");
    if (!connection) {
      return res.status(404).json({ error: "Connection request not found" });
    }

    if (connection.connectionId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to respond to this request" });
    }

    if (connection.status !== null) {
      return res
        .status(400)
        .json({ error: "This request has already been responded to" });
    }

    connection.status = status;
    await connection.save();

    // Notification only if accepted
    if (status === true) {
      const receiver = await User.findById(userId);
      const content = `${receiver.name} accepted your connection request`;

      const notification = new Notification({
        sender: userId,
        receiver: connection.userId._id,
        content,
        type: "friendRequest",
      });

      await notification.save();
    }

    return res.status(200).json({
      message: status
        ? "Request accepted successfully"
        : "Request rejected successfully",
      connection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const getConnectionsList = async (req, res) => {
  try {
    const userId = req.query.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const connections = await Connection.find({
      status: true,
      $or: [{ userId: userId }, { connectionId: userId }],
    })
      .populate({
        path: "userId",
        select: "name username email profilePicture profileId",
        populate: {
          path: "profileId",
          select:
            "bio currentPost currentCompany currentLocation skills pastWork education",
        },
      })
      .populate({
        path: "connectionId",
        select: "name username email profilePicture profileId",
        populate: {
          path: "profileId",
          select:
            "bio currentPost currentCompany currentLocation skills pastWork education",
        },
      })
      .sort({ updatedAt: -1 });

    if (!connections || connections.length === 0) {
      return res.status(200).json({
        message: "No connections found",
        connections: [],
      });
    }

    const friendList = connections.map((conn) => {
      const isSender = conn.userId._id.toString() === userId.toString();
      const friend = isSender ? conn.connectionId : conn.userId;
      return {
        connectionId: conn._id,
        friend: {
          _id: friend._id,
          name: friend.name,
          username: friend.username,
          email: friend.email,
          profilePicture: friend.profilePicture,
          profile: friend.profileId,
        },
        connectedAt: conn.updatedAt,
      };
    });

    return res.status(200).json({
      message: "Fetched connections list successfully",
      connections: friendList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const removeConnection = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params; // connection document ID

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const connection = await Connection.findById(id);
    if (!connection) {
      return res.status(404).json({ error: "Connection record not found" });
    }

    // 3. Handle pending request (cancel)
    if (connection.status === null) {
      // Only sender can cancel
      if (connection.userId.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "You are not authorized to cancel this request" });
      }

      await Connection.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Pending request cancelled successfully",
        cancelledRequestId: id,
      });
    }

    // 4. Handle active connection (remove)
    if (connection.status === true) {
      // Either participant can remove
      if (
        connection.userId.toString() !== userId.toString() &&
        connection.connectionId.toString() !== userId.toString()
      ) {
        return res
          .status(403)
          .json({ error: "You are not authorized to remove this connection" });
      }

      await Connection.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Connection removed successfully",
        removedConnectionId: id,
      });
    }

    // 5. Handle rejected request (cannot delete)
    if (connection.status === false) {
      return res.status(400).json({
        error:
          "This request was already rejected and cannot be cancelled/removed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};
