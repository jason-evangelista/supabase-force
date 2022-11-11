import SaveDraftPageBeforeUnload from "@components/SaveDraftPage/SaveDraftPageBeforeUnload";
import { NextPage } from "next";
import Head from "next/head";

const SaveDraft: NextPage = () => {
  return (
    <>
      <Head>
        <title>Save Draft</title>
      </Head>
      <SaveDraftPageBeforeUnload />
    </>
  );
};

export default SaveDraft;
