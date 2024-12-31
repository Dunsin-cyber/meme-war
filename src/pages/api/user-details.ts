import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseError, TwitterApi } from "twitter-api-v2";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/utils/session";
import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";

type Data = {
  name?: string;
  error?: string;
  data?: any;
};

//Environemt varaiables
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN;
const CONSUMER_KEY = process.env.X_API_KEY;
const CONSUMER_SECRET = process.env.X_SECRET_KEY;
const CALLBACK_URL = process.env.CALLBACK_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  const rateLimitPlugin = new TwitterApiRateLimitPlugin();

  if (req.method === "GET") {
    try {
      // Get the saved oauth_token_secret from session
      const accessToken = session.accessToken;

      if (!accessToken) {
        return res
          .status(400)
          .json({ error: "your session has expired, please login again" });
      }

      const client = new TwitterApi(accessToken);

      const user = await client.v2.me();
      return res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      if (
        error instanceof ApiResponseError &&
        error.rateLimitError &&
        error.rateLimit
      ) {
        return res.status(401).json({
          error: `You just hit the X rate limit! Limit for this endpoint is ${error.rateLimit.limit} requests!, Request counter will reset at timestamp ${error.rateLimit.reset}.`,
        });
      }
      return res.status(401).json({ error: "Error getting user details from X" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
