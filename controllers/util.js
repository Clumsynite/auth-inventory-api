const User = require("../models/User");

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const check = await User.findOne({ username });
    res.json({ exists: check !== null });
  } catch (error) {
    res.json({ error });
  }
};
