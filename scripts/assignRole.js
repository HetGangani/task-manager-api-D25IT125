require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function assignRole() {
    const email = process.argv[2];
    const role = process.argv[3] || "admin";

    if (!email) {
        console.error("Usage: node scripts/assignRole.js <email> [role]");
        console.error("Example: node scripts/assignRole.js admin@test.com admin");
        process.exit(1);
    }

    if (!["user", "admin"].includes(role)) {
        console.error("Error: Role must be 'user' or 'admin'");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOneAndUpdate(
            { email: normalizedEmail },
            { role },
            { new: true }
        );

        if (!user) {
            console.error(`User with email "${normalizedEmail}" not found.`);
            process.exit(1);
        }

        console.log(`Success: User ${user.email} role updated to: ${user.role}`);
        process.exit(0);
    } catch (error) {
        console.error("Error assigning role:", error.message);
        process.exit(1);
    }
}

assignRole();

