import { v4 } from "uuid";

export const generateOTP = async () =>
  Math.floor(Math.random() * 8999) + 1000;

export const generateSignUpLink = async () => {
  return "https://www.tghtech.com/";
};

export const generateResetPasswordLink = async (
  uuId,
) => {
  return `https://www.tghtech.com/reset-password?id=${uuId}`;
};

export const getUuid = () => {
  const uuid = v4();
  return uuid;
};
