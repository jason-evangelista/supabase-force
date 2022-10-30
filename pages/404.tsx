import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/p/dashboard");
  }, [router]);
  return <></>;
};

export default NotFound;
