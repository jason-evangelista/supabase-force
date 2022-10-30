import verifyUserSession from "@utils/api/verifyUserSession";
import { NextApiRequest, NextApiResponse } from "next";

const signOut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, supabaseServer, error } = await verifyUserSession(req, res);

  if (!user) return res.status(401).json({ message: "Unauthorized" });
  if (error) return res.status(400).json({ error });

  if (req.method !== "GET")
    return res
      .status(400)
      .json({ message: "This api call is only available for GET" });

  try {
    await supabaseServer.auth.signOut();
    return res.status(200).json({ message: "Successfully sign out" });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default signOut;
