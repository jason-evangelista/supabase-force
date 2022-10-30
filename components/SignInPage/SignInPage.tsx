import { Center } from "@mantine/core";
import { FC } from "react";
import SignInForm from "./components/SignInForm";

const SignInPage: FC = () => {
  return (
    <Center sx={{ height: "90vh" }}>
      <SignInForm />
    </Center>
  );
};

export default SignInPage;
