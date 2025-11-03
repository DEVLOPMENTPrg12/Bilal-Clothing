const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Fill all fields" });

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, passwordHash: hashed });
  await newUser.save();

  // generate JWT
  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(201).json({
    message: "User created",
    user: { name: newUser.name, email: newUser.email, role: newUser.role },
    token,
  });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Fill all fields" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.passwordHash)
    return res.status(500).json({ message: "User has no password set" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: { name: user.name, email: user.email, role: user.role },
  });
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token: newToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

