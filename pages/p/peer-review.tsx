import { SupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import { Database } from "@type/database.types";
import Head from "next/head";
import Layout from "@components/common/Layout";
import serializeData from "@utils/serializeData";
import UserReplicate from "@type/supabase/user.replicate";
import PeerReviewPage from "@components/PeerReviewPage";

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
  getServerSideProps: async (ctx, supabase: SupabaseClient<Database>) => {
    const { data } = await supabase.auth.getUser();

    const { data: userReplicate } = await supabase.rpc("get_user_replicate", {
      userid: data.user?.id || "",
    });

    return {
      props: {
        userReplicate: serializeData(JSON.stringify(userReplicate)),
      },
    };
  },
});

const PeerReview: NextPage<{ userReplicate: UserReplicate[] }> = (props) => {
  const { userReplicate } = props;
  const [user] = userReplicate;
  return (
    <>
      <Head>
        <title>Peer Review</title>
      </Head>
      <Layout user={user}>
        <PeerReviewPage />
      </Layout>
    </>
  );
};

export default PeerReview;
