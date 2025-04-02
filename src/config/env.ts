import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  MONGODB_URL: process.env.MONGODB_URL,
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  },
};
