import { Router } from "express";
import { body, validationResult } from "express-validator";
import { signup, login, getMe, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Validation middleware
const validateSignup = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
];

const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation result middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

router.post("/signup", validateSignup, handleValidationErrors, signup);
router.post("/login", validateLogin, handleValidationErrors, login);
router.get("/me", requireAuth, getMe);
router.post("/logout", logout);

export default router;
