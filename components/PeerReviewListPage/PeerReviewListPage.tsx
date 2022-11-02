import { Center } from "@mantine/core";
import { FC } from "react";
import PeerReview from "@type/supabase/peer.review";
import PeerReviewList from "./components/PeerReviewList";

type Props = {
  peerReview: PeerReview[];
};

const PeerReviewListPage: FC<Props> = (props) => {
  const { peerReview } = props;
  return (
    <Center py="lg">
      <PeerReviewList peerReview={peerReview} />
    </Center>
  );
};

export default PeerReviewListPage;
