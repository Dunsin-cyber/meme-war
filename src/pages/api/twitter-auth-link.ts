import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/utils/session";
// import { withSessionRoute } from "@/utils/session";
type Data = {
  name?: string;
  error?: string;
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
      const client = new TwitterApi({
        appKey: CONSUMER_KEY,
        appSecret: CONSUMER_SECRET,
      });

      // By default, oauth/authenticate are used for auth links, you can change with linkMode
      // property in second parameter to 'authorize' to use oauth/authorize
      const authLink = await client.generateAuthLink(CALLBACK_URL, {
        linkMode: "authenticate",
      });
      // Save user info in the session

      session.oauth_token = authLink.oauth_token;
      session.oauth_token_secret = authLink.oauth_token_secret;

       session.destroy();

      return res.status(200).json({ name: authLink.url });
    } catch (error) {
      console.log(error.data);
      return res.status(500).json({ error: "Error generating link" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
