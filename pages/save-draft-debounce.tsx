import SaveDraftPageDebounce from "@components/SaveDraftPage/SaveDraftPageDebounce";
import { NextPage } from "next";
import Head from "next/head";

const SaveDraftDebounce: NextPage = () => {
  return (
    <>
      <Head>
        <title>Save Draft Debounce</title>
      </Head>
      <SaveDraftPageDebounce />
    </>
  );
};

export default SaveDraftDebounce;
