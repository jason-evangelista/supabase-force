import { FC, useMemo } from "react";
import { Group, JsonInput, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { TabKeys } from "../KeywordAnalysisPage";
import ImagePost from "@type/supabase/image.post";
import PeerReview from "@type/supabase/peer.review";

type Props = {
  data: ImagePost[] | PeerReview[];
};

type QueryType = {
  searchQuery: string;
  queryType: TabKeys;
};

const KeywordAnalysisResult: FC<Props> = (props) => {
  const router = useRouter();
  const { searchQuery, queryType } = router.query as QueryType;

  const { data } = props;

  const keywordCount = useMemo(() => {
    if (!searchQuery) return [];
    if (queryType === "image-post") {
      const parseImagePost = data as ImagePost[];
      const wordCount = parseImagePost.map((item) => {
        const findOccurence = item.description.match(
          new RegExp(searchQuery, "ig")
        );

        return findOccurence;
      });
      return wordCount.flat();
    }
    if (queryType === "peer-review") {
      const parsePeerReview = data as PeerReview[];
      const wordCount = parsePeerReview.map((item) => {
        const findOccurence = item.review_insight.match(
          new RegExp(searchQuery, "ig")
        );
        return findOccurence;
      });
      return wordCount.flat();
    }
  }, [data, queryType, searchQuery]);

  const totalSetOccurence = searchQuery ? data.length : 0;

  return (
    <Stack>
      <Group align="center">
        <Title order={5}>Total Set Occurence: {totalSetOccurence}</Title>
        <Title order={5}>Keyword count: {keywordCount?.length}</Title>
      </Group>
      <JsonInput
        value={searchQuery ? JSON.stringify(data, undefined, 2) : ""}
        minRows={25}
        placeholder="Keyword analysis set occurence"
        variant="filled"
      />
    </Stack>
  );
};

export default KeywordAnalysisResult;
