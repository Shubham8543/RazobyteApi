const usermodel = require("../Schema/Resgister"); // Fixed typo in the file name if necessary
const express = require("express");
const router = express.Router(); // Changed to 'router'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  res.send("working");
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).json({ msg: "Error generating salt", error: err.message });
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({ msg: "Error hashing password", error: err.message });
        }

        const userdata = await usermodel.create({
          email,
          password: hash,
        });

        const token = jwt.sign({ email }, "shuuuuubham");
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({ msg: "Data saved to database", userdata });
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Error saving data", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const userdata = await usermodel.findOne({ email });
    if (!userdata) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userdata.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ email }, "shuuuuubham");
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ msg: "Login successful", userdata });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true });
    res.status(200).json({ success: true, message: "Logout successfully done" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

router.get("/authuser", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ success: false, message: "Unauthorized: Access Denied" });
    }

    let original;
    try {
      original = jwt.verify(token, "shuuuuubham");
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const userdata = await usermodel.findOne({ email: original.email });
    if (!userdata) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: userdata });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

module.exports = router;
