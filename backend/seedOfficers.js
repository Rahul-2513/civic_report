require("dotenv").config();

const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const connectDB = require("./src/config/db");
const User = require("./src/models/User");

// Read officers.json
const officers = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "officers.json"),
    "utf-8"
  )
);

const seedOfficers = async () => {
  try {
    console.log("🚀 Inserting officers...\n");

    for (const officer of officers) {
      // Duplicate Check
      const exists = await User.findOne({
        $or: [
          { email: officer.email },
          { employeeId: officer.employeeId },
        ],
      });

      if (exists) {
        console.log(`⚠ ${officer.employeeId} already exists`);
        continue;
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(
        officer.password,
        10
      );

      // Save Officer
      await User.create({
        name: officer.name,
        email: officer.email,
        password: hashedPassword,
        role: "officer",
        employeeId: officer.employeeId,
        department: officer.department,
        post: officer.post,
        phone: officer.phone,
      });

      console.log(`✅ ${officer.name} inserted`);
    }

    console.log("\n🎉 All officers inserted successfully.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

const start = async () => {
  await connectDB();
  await seedOfficers();
};

start();