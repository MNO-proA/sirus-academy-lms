const User = require("../../models/User");

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const users = await User.find({}, { userEmail: 1, role: 1, _id: 1 });
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const { userId } = req.params;
    const { role } = req.body;

    if (!["admin", "instructor", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, select: 'userEmail role' }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser
};