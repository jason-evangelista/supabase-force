type PeerReviewFormBody = {
  name: string;
  presentation_score: number;
  presentation_comment: string;
  technical_score: number;
  technical_comment: string;
  assists_peer_score: number;
  assists_peer_comment: string;
  documentation_score: number;
  documentation_comment: string;
  stood_out_comment: string;
};

export default PeerReviewFormBody;
