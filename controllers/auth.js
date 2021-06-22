const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.login = (req, res) =>
  passport.authenticate("local", (err, user) => {
    if (err || !user) {
      return res.json({
        error: "Something is not right\ntry a different username or password",
        success: false,
      });
    }
    return req.login(user, async (error) => {
      if (error) {
        return res.json({ error, success: false });
      }
      const { _doc } = user;
      const { photo, web } = req.body;
      const userWithNoPhoto = { ..._doc, photo: false };
      const token = jwt.sign(userWithNoPhoto, process.env.SECRET);
      if (web)
        res.cookie("auth", token, {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
      return res.json({
        user: photo ? user : userWithNoPhoto,
        success: true,
        token,
        msg: "Login Successful",
      });
    });
  })(req, res);

exports.logout = async (req, res) => {
  try {
    req.logout();
    res.clearCookie("auth", {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    return res.json({ msg: "Logged out successfully", success: true });
  } catch (error) {
    return res.json({ error: `Logout Failed\n${error}`, success: false });
  }
};
