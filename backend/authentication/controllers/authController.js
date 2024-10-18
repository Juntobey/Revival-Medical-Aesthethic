const User = require("../models/user");
const UserProfile = require("../models/userProfile");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "your_jwt_secret";

const register = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    nationality,
    birthday,
    gender,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User with default roleId (Patient)
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Create UserProfile
    await UserProfile.create({
      firstName,
      lastName,
      nationality,
      birthday,
      gender,
      emergencyContactName,
      emergencyContactNumber,
      userId: user.id,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [
        { model: UserProfile, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        { model: Role, attributes: { exclude: ['createdAt', 'updatedAt'] } }
      ],
    });

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

    // Prepare response with user profile and role
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.Role.name,
        profile: user.UserProfile,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    nationality,
    birthday,
    gender,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body;

  try {
    const userProfile = await UserProfile.update(
      {
        firstName,
        lastName,
        nationality,
        birthday,
        gender,
        emergencyContactName,
        emergencyContactNumber,
      },
      { where: { userId } }
    );

    if (!userProfile[0]) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  try {
    const user = await User.update(
      { roleId },
      { where: { id: userId } }
    );

    if (!user[0]) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.update({ password: hashedPassword }, { where: { email } });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { 
  register,
  login, 
  updateUserProfile, 
  updateUserRole, 
  resetPassword 
};

