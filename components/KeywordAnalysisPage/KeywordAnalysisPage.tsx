import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { Container, Tabs } from "@mantine/core";
import { Database } from "@type/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import KeywordAnalysisForm from "./components/KeywordAnalysisForm";
import KeywordAnalysisResult from "./components/KeywordAnalysisResult";
import ImagePost from "@type/supabase/image.post";
import PeerReview from "@type/supabase/peer.review";

const IMAGE_POST = "image-post";
const PEER_REVIEW = "peer-review";

export type TabKeys = typeof IMAGE_POST | typeof PEER_REVIEW;

const KeywordAnalysisPage: FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();
  const [tab, setTab] = useState<TabKeys>("image-post");
  const [analysisResultImagePost, setAnalysisResultImagePost] = useState<
    ImagePost[]
  >([]);
  const [analysisResultPeerReview, setAnalysisResultPeerReview] = useState<
    PeerReview[]
  >([]);

  const handleKeywordAnalysis = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const searchQuery = form.get("searchQuery");
      router.replace({
        query: {
          ...router.query,
          searchQuery: searchQuery?.toString(),
          queryType: tab,
        },
      });

      if (tab === "image-post") {
        const { data } = await supabaseClient
          .from("image_post")
          .select("*")
          .textSearch("description_doc", searchQuery as string, {
            config: "simple",
          });
        setAnalysisResultImagePost(data as ImagePost[]);
      }

      if (tab === "peer-review") {
        const { data } = await supabaseClient
          .from("peer_review")
          .select("*")
          .textSearch("review_insight_doc", searchQuery as string, {
            config: "simple",
          });
        setAnalysisResultPeerReview(data as PeerReview[]);
      }
    },
    [supabaseClient, tab, router]
  );

  useEffect(() => {
    setAnalysisResultImagePost([]);
    setAnalysisResultPeerReview([]);
  }, [tab]);

  return (
    <Container size="sm">
      <Tabs
        defaultValue={tab}
        onTabChange={(v) => {
          setTab(v as TabKeys);
          router.replace({
            query: {
              queryType: v,
            },
          });
        }}
      >
        <Tabs.List>
          <Tabs.Tab value={IMAGE_POST}>Image Post</Tabs.Tab>
          <Tabs.Tab value={PEER_REVIEW}>Peer Review</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={IMAGE_POST}>
          <KeywordAnalysisForm handleKeywordAnalysis={handleKeywordAnalysis} />
          <KeywordAnalysisResult data={analysisResultImagePost} />
        </Tabs.Panel>
        <Tabs.Panel value={PEER_REVIEW}>
          <KeywordAnalysisForm handleKeywordAnalysis={handleKeywordAnalysis} />
          <KeywordAnalysisResult data={analysisResultPeerReview} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default KeywordAnalysisPage;
