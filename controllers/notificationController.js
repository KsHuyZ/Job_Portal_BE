const notificationModel = require("../models/notificationModel");

exports.createNotification = async (notification) => {
  const { jobId, toUser, type } = notification;
  try {
    const notification = new notificationModel({ jobId, toUser, type });
    await notification.save();
    return notification;
  } catch (error) {
    return false;
  }
};
