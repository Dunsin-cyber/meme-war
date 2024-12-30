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
const CALLBACK_URL = process.env.X_CALLBACK_URL;
const CLIENT_ID = process.env.X_CLIENT_ID;
const CLIENT_SECRET = process.env.X_CLIENT_SECRET;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (req.method === "GET") {
    try {
      // Extract tokens from query string
      const { state, code } = req.query;
      // Get the saved codeVerifier from session
      const codeVerifier = session.codeVerifier;
      const sessionState = session.state;


      console.log("state", state, "sessionState",  sessionState);
      if (!codeVerifier || !state || !sessionState || !code) {
        return res
          .status(400)
          .json({ error: "You denied the app or your session expired!" });
      }
      if (state !== sessionState) {
        return res.status(400).json({ error: "Stored tokens didnt match!" });
      }

      // Obtain access token
      const client = new TwitterApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      });

   
  client
    .loginWithOAuth2({ code: code as string, codeVerifier, redirectUri: CALLBACK_URL })
    .then(
      async ({
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn,
      }) => {
        session.accessToken = accessToken;
        session.refreshToken = refreshToken;
        await session.save()
    
        const { data: userObject } = await loggedClient.v2.me();
              return res.status(200).json({ data: userObject });

      }
    )
    .catch(() => res.status(403).json({error:"Invalid verifier or access tokens!"}));
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
