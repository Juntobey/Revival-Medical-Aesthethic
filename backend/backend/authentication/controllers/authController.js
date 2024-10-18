const { User, UserProfile } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "your_jwt_secret";

// User registration
const register = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User and Profile
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await UserProfile.create({ firstName, lastName, userId: user.id });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
