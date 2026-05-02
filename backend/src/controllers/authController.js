import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function createToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

function cookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function safeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with that email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = createToken(user);
    res.cookie("token", token, cookieOptions());
    return res.status(201).json({ user: safeUser(user) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to create account", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);
    res.cookie("token", token, cookieOptions());
    return res.json({ user: safeUser(user) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to sign in", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user: safeUser(user) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch user", error: error.message });
  }
};

export const logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return res.json({ message: "Signed out" });
};
