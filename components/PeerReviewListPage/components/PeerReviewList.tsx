import { Stack, TextInput } from "@mantine/core";
import PeerReview from "@type/supabase/peer.review";
import { useRouter } from "next/router";
import { FC, FormEvent, useRef } from "react";
import PeerReviewCard from "./PeerReviewCard";

type Props = {
  peerReview: PeerReview[];
};

const PeerReviewList: FC<Props> = (props) => {
  const router = useRouter();
  const { peerReview } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchInputRef.current?.value;
    router.replace({
      query: {
        ...router.query,
        searchQuery: query,
      },
    });
  };

  return (
    <Stack>
      <form onSubmit={handleSearch}>
        <TextInput ref={searchInputRef} placeholder="Search for keyword" />
      </form>
      {peerReview.map((item) => (
        <PeerReviewCard key={item.id} peerReview={item} />
      ))}
    </Stack>
  );
};

export default PeerReviewList;
