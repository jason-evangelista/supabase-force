import axios from "axios";
import PeerReviewFormBody from "../type/peer.review.form";
import parsePeerReview from "../utils/parsePeerReview";

const serviceSavePeerReview = async (body: PeerReviewFormBody) => {
  const parsePeerReviewData = parsePeerReview(body);
  const data = await axios.post("/api/peer-review", { ...parsePeerReviewData });

  return data;
};

export default serviceSavePeerReview;
