const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Creating user
router.post("/", (req, res) => {
  try {
    var { username, password } = req.body;
    User.countDocuments({ username: username }, function (err, count) {
      if (count > 0) {
        res.status(200).json({ message: "User already exists" });
      } else {
        const create_user = new User({
          username: username,
          password: password,
          collection_ids: [],
        });
        create_user.save();
        res.status(200).json({ message: "Success" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Getting user object
router.post("/login", async (req, res) => {
  try {
    var { username, password } = req.body;
    const user_login = await User.findOne({ username: username }).exec();
    if (user_login) res.status(200).json({ message: "Success" });
    else res.status(200).json({ message: "Fail" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Updating user object
router.patch("/", (req, res) => {});

module.exports = router;
