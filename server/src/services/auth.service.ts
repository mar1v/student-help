import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES } from "../config/jwt";
import User from "../models/User";

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const exists = await User.findOne({ email }).lean();
    if (exists) throw new Error("User exists");

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash });
    return user;
  },

  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).lean();
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: JWT_EXPIRES,
      },
    );

    return { token };
  },
};
