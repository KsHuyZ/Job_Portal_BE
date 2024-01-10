const express = require("express");
const router = express.Router();
const {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
  createUserJobsHistory,
  getHistoryJobsApply,
  activeUser,
  changePassword
} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { uploadCloud } = require("../config/cloudinary");

//user routes

// /api/allusers
router.get("/allusers", isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get("/user/active/:id", activeUser);

router.get("/user/:id", isAuthenticated, singleUser);
// /api/user/edit/id
router.put("/user/edit/:id", isAuthenticated, editUser);
router.put("/user/change-password", isAuthenticated, changePassword);

// /api/admin/user/delete/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);
// /api/user/jobhistory
router.post(
  "/user/jobhistory",
  isAuthenticated,
  uploadCloud.single("file"),
  createUserJobsHistory
);

module.exports = router;
