const express = require("express");

const authController = require("../authentication/controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.put("/profile/:userId", authController.updateUserProfile);
router.put("/role/:userId", authController.updateUserRole);
router.post("/reset-password", authController.resetPassword);
router.get("/users", authController.getUsers);

module.exports = router;
