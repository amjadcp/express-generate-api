import { v4 } from "uuid";
// import { appConfig } from "../config/appConfig";

export const generateOTP = async (): Promise<number> =>
  Math.floor(Math.random() * 8999) + 1000;

export const generateSignUpLink = async (): Promise<string> => {
  return "https://www.tghtech.com/";
};

export const generateResetPasswordLink = async (
  uuId: string,
): Promise<string> => {
  return `https://www.tghtech.com/reset-password?id=${uuId}`;
};

export const getUuid = (): string => {
  const uuid = v4();
  return uuid;
};
