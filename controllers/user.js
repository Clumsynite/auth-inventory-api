const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.onGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res
      .status(200)
      .json({ success: true, users, msg: "Successfully retreived User List" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
exports.onGetUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    return res
      .status(200)
      .json({ success: true, user, message: `${username}'s data retreived` });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.onCreateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(500).json({
        error: "User already exists. Try a different username",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    return res
      .status(200)
      .json({ success: true, user, msg: "Signup Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.onUpdateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(
      { _id },
      {
        ...req.body,
      }
    );
    const user = await User.findOne({ _id });
    return res
      .status(200)
      .json({ success: true, user, msg: "Update Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

exports.onDeleteUserByUsername = async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.deleteOne({ username });
    return res.status(200).json({
      success: true,
      message: `Deleted a count of ${user.deletedCount} user.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
