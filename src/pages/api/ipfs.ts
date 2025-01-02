import type { NextApiRequest, NextApiResponse } from "next";
import { pinata } from "@/utils/config";
import { KeyResponse } from "pinata-web3";

type Data = {
  name?: string;
  error?: string;
  key?: KeyResponse;
};

export const dynamic = "force-dynamic";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const uuid = crypto.randomUUID();
      const keyData = await pinata.keys.create({
        keyName: uuid.toString(),
        permissions: {
          endpoints: {
            pinning: {
              pinFileToIPFS: true,
            },
          },
        },
        maxUses: 3,
      });
      return res.status(200).json({key: keyData});
    } catch (error) {
      console.log(error);
      return res.status(500).json(
        { error: "Error creating API Key:" },
      );
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
