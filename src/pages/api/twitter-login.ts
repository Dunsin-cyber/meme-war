import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/utils/session";

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

  if (req.method === "GET") {
    try {
      // Extract tokens from query string
      const { oauth_token, oauth_verifier } = req.query;
      // Get the saved oauth_token_secret from session
      const oauth_token_secret = session.oauth_token_secret;

      if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
        return res
          .status(400)
          .json({ error: "You denied the app or your session expired!" });
      }

      const client = new TwitterApi({
        appKey: CONSUMER_KEY,
        appSecret: CONSUMER_SECRET,
        // accessToken: oauth_token,
        // accessSecret: oauth_token_secret,
      });

      client
        .login(oauth_verifier as string)
        .then(async ({ client: loggedClient, accessToken, accessSecret }) => {
          // loggedClient is an authenticated client in behalf of some user
          // Store accessToken & accessSecret somewhere
          session.accessToken = accessToken;
          session.accessSecret = accessSecret;
          await session.save();
          return res.status(200).json({ data: loggedClient });
        })
        .catch(() =>
          res.status(403).json({ error: "Invalid verifier or access tokens!" })
        );
    } catch (error) {
      console.log(error.data);
      return res.status(500).json({ error: "Error getting logged in user" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
