const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { login } = require("../controllers/authController");

// Rate Limiting Middleware
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message:
        "Too many login attempts from this IP, please try again after 10 minutes.",
    keyGenerator: (req) => req.ip
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: mypassword
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

router.post("/", loginLimiter, login);

module.exports = router;
