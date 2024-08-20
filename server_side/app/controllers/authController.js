// Basic JWT Authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Example user array (for demonstration purposes only)
const users = [
    {
        id: 1,
        username: "user1",
        passwordHash:
            "$2b$10$G4sNLTajBrT/NVdL5zURY.LQk0Dld2o40JYCjEFjngE3fppMJQIy6"
    }
];

// const saltRounds = 10;

// (async () => {
//     const hashedPassword = await bcrypt.hash("test", saltRounds);
//     console.log(hashedPassword);
// })();

const login = async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    res.json({ token });
};

module.exports = { login };
