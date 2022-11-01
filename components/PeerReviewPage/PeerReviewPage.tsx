import { Center } from "@mantine/core";
import { FC } from "react";
import PeerReviewForm from "./components/PeerReviewForm";

const PeerReviewPage: FC = () => {
  return (
    <Center pb="xl">
      <PeerReviewForm />
    </Center>
  );
};

export default PeerReviewPage;
