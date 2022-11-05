import { NextPage } from "next";
import { SupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Database } from "@type/database.types";
import Layout from "@components/common/Layout";
import KeywordAnalysisPage from "@components/KeywordAnalysisPage";
import Head from "next/head";
import serializeData from "@utils/serializeData";
import UserReplicate from "@type/supabase/user.replicate";

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

const KeywordAnalysis: NextPage<{ userReplicate: UserReplicate[] }> = (
  props
) => {
  const { userReplicate } = props;
  const [user] = userReplicate;

  return (
    <>
      <Head>
        <title>Keyword Analysis</title>
      </Head>
      <Layout user={user}>
        <KeywordAnalysisPage />
      </Layout>
    </>
  );
};

export default KeywordAnalysis;
