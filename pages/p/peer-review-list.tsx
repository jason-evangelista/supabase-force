import Layout from "@components/common/Layout";
import PeerReviewListPage from "@components/PeerReviewListPage";
import { NextPage } from "next";
import { SupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Database } from "@type/database.types";
import PeerReview from "@type/supabase/peer.review";
import UserReplicate from "@type/supabase/user.replicate";
import serializeData from "@utils/serializeData";
import Head from "next/head";

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
  getServerSideProps: async (ctx, supabase: SupabaseClient<Database>) => {
    const { data } = await supabase.auth.getUser();
    const searchQuery = ctx.query.searchQuery as string;

    const { data: userReplicate } = await supabase.rpc("get_user_replicate", {
      userid: data.user?.id || "",
    });

    if (searchQuery) {
      const parseSearchQuery = searchQuery.split(" ").join(" | ");
      const { data: peerReview } = await supabase
        .from("peer_review")
        .select("*")
        .textSearch("review_insight_doc", `${parseSearchQuery}:*`, {
          config: "english",
        });
      return {
        props: {
          userReplicate: serializeData(JSON.stringify(userReplicate)),
          peerReview: serializeData(JSON.stringify(peerReview)),
        },
      };
    } else {
      const { data: peerReview } = await supabase
        .from("peer_review")
        .select("*");
      console.log(peerReview);
      return {
        props: {
          userReplicate: serializeData(JSON.stringify(userReplicate)),
          peerReview: serializeData(JSON.stringify(peerReview)),
        },
      };
    }
  },
});

const PeerReviewList: NextPage<{
  userReplicate: UserReplicate[];
  peerReview: PeerReview[];
}> = (props) => {
  const { userReplicate, peerReview } = props;
  const [user] = userReplicate;
  return (
    <>
      <Head>
        <title>Peer Review List</title>
      </Head>
      <Layout user={user}>
        <PeerReviewListPage peerReview={peerReview} />
      </Layout>
    </>
  );
};

export default PeerReviewList;
