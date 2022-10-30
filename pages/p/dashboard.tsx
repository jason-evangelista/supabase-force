import { SupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Database } from "@utils/database.types";
import { NextPage } from "next";

import serializeData from "@utils/serializeData";
import Head from "next/head";
import Layout from "@components/common/Layout";
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

const Dashboard: NextPage<{
  userReplicate: UserReplicate[];
}> = (props) => {
  const { userReplicate } = props;

  const [user] = userReplicate;

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout user={user}>
        <div>Dashboard</div>
      </Layout>
    </>
  );
};

export default Dashboard;
