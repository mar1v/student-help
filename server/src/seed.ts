import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { connectDB } from "./config/db";
import Request from "./models/Request";
import ResponseModel from "./models/ResponseModel";
import User from "./models/User";

async function seed() {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await Promise.all([
      User.deleteMany({}),
      Request.deleteMany({}),
      ResponseModel.deleteMany({}),
    ]);

    const saltRounds = 10;
    const usersData = [
      { name: "Alice", email: "alice@egmail.com", password: "password1" },
      { name: "Bob", email: "bob@gmail.com", password: "password2" },
      { name: "Carol", email: "carol@gmail.com", password: "password3" },
    ];

    const users = [] as any[];
    for (const u of usersData) {
      const hash = await bcrypt.hash(u.password, saltRounds);
      const created = await User.create({
        name: u.name,
        email: u.email,
        passwordHash: hash,
      });
      users.push(created);
    }

    console.log(`Created ${users.length} users`);

    const requestsData = [
      {
        title: "Need help with linear algebra",
        description: "Struggling with eigenvalues and eigenvectors",
        subject: "Math",
        author: users[0]._id,
      },
      {
        title: "Physics lab report question",
        description: "How to analyze uncertainty in measurements",
        subject: "Physics",
        author: users[1]._id,
      },
      {
        title: "Need explanation of async/await",
        description: "Understanding promises and async functions in JS",
        subject: "Programming",
        author: users[2]._id,
      },
    ];

    const requests = [] as any[];
    for (const r of requestsData) {
      const created = await Request.create(r as any);
      requests.push(created);
    }

    console.log(`Created ${requests.length} requests`);

    const responsesData = [
      {
        request: requests[0]._id,
        author: users[1]._id,
        message: "I can help with eigenvectors — available evenings.",
      },
      {
        request: requests[0]._id,
        author: users[2]._id,
        message: "Check out these notes: [link]",
      },
      {
        request: requests[2]._id,
        author: users[0]._id,
        message: "Async/await is syntactic sugar over promises.",
      },
    ];

    const responses = [] as any[];
    for (const resp of responsesData) {
      const created = await ResponseModel.create(resp as any);
      responses.push(created);
    }

    console.log(`Created ${responses.length} responses`);

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
