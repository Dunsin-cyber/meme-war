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
const CALLBACK_URL = process.env.X_CALLBACK_URL;
const CLIENT_ID = process.env.X_CLIENT_ID;
const CLIENT_SECRET = process.env.X_CLIENT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  session.destroy();
  if (req.method === "GET") {
    try {
      // const client = new TwitterApi({
      //   appKey: CONSUMER_KEY,
      //   appSecret: CONSUMER_SECRET,
      // });
      const client = new TwitterApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      });

      // By default, oauth/authenticate are used for auth links, you can change with linkMode
      // property in second parameter to 'authorize' to use oauth/authorize
      // Don't forget to specify 'offline.access' in scope list if you want to refresh your token later
      const { url, codeVerifier, state } =  client.generateOAuth2AuthLink(
        CALLBACK_URL,
        { scope: ["tweet.read","tweet.write", "follows.read", "users.read", "offline.access"] }
      );

      // Redirect your user to {url}, store {state} and {codeVerifier} into a DB/Redis/memory after user redirection
      // Save user info in the session
      session.state = state;
      session.codeVerifier = codeVerifier;
      await session.save();

      return res.status(200).json({ name: url });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error generating link" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
