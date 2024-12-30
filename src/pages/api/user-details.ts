import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/utils/session";

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

  if (req.method === "GET") {
    try {
      // Get the saved oauth_token_secret from session
      const accessToken = session.accessToken;

      if (!accessToken) {
        return res
          .status(400)
          .json({ error: "your session has expired, please login aagin" });
      }

      const client = new TwitterApi(accessToken);

      const user = await client.v2.me();
      return res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      return res.status(error.status).json({ error: error });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
