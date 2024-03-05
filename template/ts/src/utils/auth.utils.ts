import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { appConfig } from "./env.utils";

export const generateToken = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  expiryTime?: string | number,
): Promise<string> => {
  const options = {
    expiresIn: expiryTime ?? "30d",
  };
  return jwt.sign({ ...data }, appConfig.jwtSecret, options);
};

export const verifyValue = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};

export const hashValue = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, 10);
};

export const generatePassword = (length: number): string => {
  let result: string = "";
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};