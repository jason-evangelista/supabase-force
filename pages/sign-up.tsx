import { NextPage } from "next";
import SignUpPage from "@components/SignUpPage";
import Head from "next/head";
import Layout from "@components/common/Layout";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Layout>
        <SignUpPage />
      </Layout>
    </>
  );
};

export default SignUp;
