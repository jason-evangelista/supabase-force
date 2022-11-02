import { SupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Database } from "@type/database.types";
import { NextPage } from "next";

import serializeData from "@utils/serializeData";
import Head from "next/head";
import Layout from "@components/common/Layout";
import UserReplicate from "@type/supabase/user.replicate";
import ImagePost from "@type/supabase/image.post";
import DashboardPage from "@components/DashboardPage";

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
  getServerSideProps: async (ctx, supabase: SupabaseClient<Database>) => {
    const { data } = await supabase.auth.getUser();
    const { data: userReplicate } = await supabase.rpc("get_user_replicate", {
      userid: data.user?.id || "",
    });

    const searchQuery = ctx.query.searchQuery as string;

    if (searchQuery) {
      const parseSearchQuery = searchQuery.split(" ").join(" | ");
      const { data: imagePost } = await supabase
        .from("image_post")
        .select(
          "id, image_url, is_public, description, compress_action, created_at, user_profile(user_name), description_doc"
        )
        .textSearch("description_doc", `${parseSearchQuery}:*`, {
          config: "english",
        });
      return {
        props: {
          userReplicate: serializeData(JSON.stringify(userReplicate)),
          imagePost: serializeData(JSON.stringify(imagePost)),
        },
      };
    } else {
      const { data: imagePost } = await supabase
        .from("image_post")
        .select(
          `id, image_url, is_public, description, compress_action, created_at, user_profile(user_name)`
        );
      return {
        props: {
          userReplicate: serializeData(JSON.stringify(userReplicate)),
          imagePost: serializeData(JSON.stringify(imagePost)),
        },
      };
    }
  },
});

const Dashboard: NextPage<{
  userReplicate: UserReplicate[];
  imagePost: ImagePost[];
}> = (props) => {
  const { userReplicate, imagePost } = props;
  const [user] = userReplicate;

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout user={user}>
        <DashboardPage imagePost={imagePost} />
      </Layout>
    </>
  );
};

export default Dashboard;
