import { appConfig } from "../config/appConfig";

export const isProduction = (): boolean => appConfig.nodeEnv === "production";
