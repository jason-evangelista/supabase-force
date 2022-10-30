import { Center } from "@mantine/core";
import { FC } from "react";
import SignUpForm from "./components/SignUpForm";

const SignUpPage: FC = () => {
  return (
    <Center sx={{ height: "90vh" }}>
      <SignUpForm />
    </Center>
  );
};

export default SignUpPage;
