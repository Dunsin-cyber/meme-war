import { SessionOptions } from "iron-session";

export interface SessionData {
  accessToken: string;
  accessSecret: string;
  oauth_token: string;
  oauth_token_secret: string;
  codeVerifier: string;
  state: string;
  refreshToken: string
}

export const defaultSession: SessionData = {
  accessToken: "",
  accessSecret: "",
  oauth_token: "",
  oauth_token_secret: "",
  state: "",
  codeVerifier: "",
  refreshToken: "",
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "iron-examples-pages-router-api-route-swr",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
