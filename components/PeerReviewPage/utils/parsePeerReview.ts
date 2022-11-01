import ParsePeerReview from "../type/parse.peer.review";
import PeerReviewFormBody from "../type/peer.review.form";

const parsePeerReview = (payload: PeerReviewFormBody) => {
  const parsePeerReview: ParsePeerReview = {
    name: payload.name,
    date: new Date().toISOString(),
    required_rating: {
      presentation_score: {
        score: payload.presentation_score,
        comment: payload.presentation_comment,
      },
      technical_score: {
        score: payload.technical_score,
        comment: payload.technical_comment,
      },
      assists_peers_score: {
        score: payload.assists_peer_score,
        comment: payload.assists_peer_comment,
      },
      documentation_score: {
        score: payload.documentation_score,
        comment: payload.documentation_comment,
      },
    },
    optional_rating: {
      stood_out: payload.stood_out_comment,
    },
  };

  return parsePeerReview;
};

export default parsePeerReview;
