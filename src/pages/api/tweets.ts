import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseError, TwitterApi } from "twitter-api-v2";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/utils/session";
import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";

type Data = {
  name?: string;
  error?: any;
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
      const {tweet1, tweet2} = req.query;
      // Get the saved oauth_token_secret from session
      const accessToken = session.accessToken;

      if (!accessToken) {
        return res
          .status(400)
          .json({ error: "your session has expired, please login aagin" });
      }

      const client = new TwitterApi(accessToken, {
        plugins: [rateLimitPlugin],
      });

      const { data: createdTweet } = await client.v2.tweets([tweet1 as string, tweet2 as string]);

      return res.status(201).json({
        data: createdTweet,
      });
    } catch (error) {
      if (
        error instanceof ApiResponseError &&
        error.rateLimitError &&
        error.rateLimit
      ) {
        return res.status(401).json({
          error: `You just hit the X rate limit! Limit for this endpoint is ${error.rateLimit.limit} requests!, Request counter will reset at timestamp ${error.rateLimit.reset}.`,
        });
      }

      console.log(error);
      return res.status(401).json({ error: "Error getting the tweet" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
