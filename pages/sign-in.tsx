import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Layout from "@components/common/Layout";
import SignInPage from "@components/SignInPage";
import Head from "next/head";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const supabaseServer = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: "/p/dashboard",
        permanent: true,
      },
    };

  return {
    props: {},
  };
};

const SignIn: NextPage = () => {
  const router = useRouter();
  const { isLoading, session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router.replace("/p/dashboard");
      return;
    }
  }, [session, router]);

  if (isLoading) return null;
  return session ? (
    <></>
  ) : (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Layout>
        <SignInPage />
      </Layout>
    </>
  );
};

export default SignIn;
