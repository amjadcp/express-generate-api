import { config } from "dotenv";

config();

export const appConfig = {
  port: process.env.PORT ?? 5000,
  whiteList: process.env.WHITE_LIST ?? "",
  mongoUri: process.env.MONGO_URI ?? "",
  redisUri: process.env.REDIS_URI ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  sibKey: process.env.SIB_KEY ?? "",
  sibSource: process.env.SIB_SOURCE ?? "",
  nodeEnv: process.env.NODE_ENV ?? "",
  appRoot: process.env.APP_ROOT ?? "",
  backendUrl: process.env.BACKEND_URL ?? "",
  googelScopes: process.env.GOOGLE_SCOPES ?? "",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  firebaseKey: process.env.FIREBASE_KEY ?? "",
  marketingTeam: process.env.MARKETING_TEAM ?? "",
};

export const isProduction = (): boolean => appConfig.nodeEnv === "production";
