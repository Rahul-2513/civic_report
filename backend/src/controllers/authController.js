const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Register User
const registerUser = async (req, res) => {
  try {
    const {
  name,
  email,
  password,
  role,
  phone,
  address,
  department,
  post,
  employeeId,
} = req.body;

    // Check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create User
    const userData = {
  name,
  email,
  password: hashedPassword,
  role,
  phone,
  address,
};

// Only officers should have these fields
if (role === "officer") {
  userData.department = department;
  userData.post = post;
  userData.employeeId = employeeId;
}

const user = await User.create(userData);

    // Generate Token
    const token = generateToken(
      user._id,
      user.role
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
      console.log("Login Request:");
    console.log(req.body);
    const {
      email,
      password,
      employeeId,
      department,
      post,
      role,
    } = req.body;

    let user;

    // Officer Login
    if (role === "officer") {
      user = await User.findOne({
        email,
        employeeId,
        department,
        post,
        role: "officer",
      });
    } else {
      // Citizen/Admin Login
      user = await User.findOne({
        email,
        role,
      });
    }
     console.log("User Found:", user);

    if (!user) {
  return res.status(401).json({
    success: false,
    message:
      role === "officer"
        ? "Invalid Officer details (Email, Employee ID, Department or Post)."
        : "Invalid Email or Role.",
  });
}

 const isMatch = await bcrypt.compare(
  password,
  user.password
);
 console.log("Password Match:", isMatch);
    // Compare Password
    if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Incorrect password.",
  });
}

    console.log("User Found:", user);

    // Update Last Login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(
      user._id,
      user.role
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Current Logged In User
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      profileImage,
      settings,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.profileImage = profileImage || user.profileImage;

    if (settings) {
      user.settings = {
        ...user.settings,
        ...settings,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profileImage = req.file.path;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  uploadProfileImage,
};
