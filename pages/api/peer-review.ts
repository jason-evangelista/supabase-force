import { NextApiRequest, NextApiResponse } from "next";
import ParsePeerReview from "@components/PeerReviewPage/type/parse.peer.review";
import verifyUserSession from "@utils/api/verifyUserSession";
import recordApiAnalytics from "@utils/recordApiAnalytics";

const peerReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, supabaseServer, error } = await verifyUserSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  if (error) return res.status(400).json({ error });
  if (req.method !== "POST")
    return res.status(400).json({ message: "This api call is only for POST" });

  try {
    const bodyPayload = req.body as ParsePeerReview;

    const { error } = await supabaseServer.rpc("insert_peer_review", {
      created_by: user.id,
      review_insight: JSON.stringify(bodyPayload),
    });

    if (error) return res.status(400).json({ message: error.message });

    const apiPath = `${req.method} ${req.url}`;
    await recordApiAnalytics(apiPath, user.id);

    return res.status(200).json({ message: "Peer review Successfully save" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong." });
  }
};

export default peerReview;
