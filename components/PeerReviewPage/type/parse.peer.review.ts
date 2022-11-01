type RatingProps = {
  score: number;
  comment: string;
};

type ParsePeerReview = {
  name: string;
  date: string;
  required_rating: {
    presentation_score: RatingProps;
    technical_score: RatingProps;
    assists_peers_score: RatingProps;
    documentation_score: RatingProps;
  };
  optional_rating: {
    stood_out: string;
  };
};

export default ParsePeerReview;
