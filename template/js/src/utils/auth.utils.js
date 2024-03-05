import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { appConfig } from "./env.utils.js";

export const generateToken = async (
  data,
  expiryTime,
 ) => {
  const options = {
    expiresIn: expiryTime ?? "30d",
  };
  return jwt.sign({ ...data }, appConfig.jwtSecret, options);
};

export const verifyValue = async (
  value,
  hashedValue,
) => {
  return await bcrypt.compare(value, hashedValue);
};

export const hashValue = async (value) => {
  return await bcrypt.hash(value, 10);
};

export const generatePassword = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};