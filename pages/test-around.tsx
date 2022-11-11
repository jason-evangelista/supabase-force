import { Button, Center, Stack } from "@mantine/core";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Head from "next/head";
import axios from "axios";
import FormGroupProvider from "@components/Form/FormGroupProvider";
import FormStandard from "@components/Form/FormStandard";

type FormField = {
  email: string;
  password: string;
};

const TestAround: NextPage = () => {
  const { control, handleSubmit, getValues } = useForm<FormField>();

  const handleCallEdgeInstance = async () => {
    const perf = performance.now();
    console.log(perf);
    try {
      await axios.get("/api/call-edge");
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnSumbit = () => {
    console.log(getValues());
  };

  return (
    <>
      <Head>
        <title>Work Around</title>
      </Head>
      <Center p="md">
        <Stack>
          <Button onClick={handleCallEdgeInstance} mb="md">
            Test Edge Function
          </Button>
          {/* <FormGroupProvider
            handleSubmit={handleSubmit(handleOnSumbit)}
            control={control}
            inputNode={[
              {
                type: "Email",
                label: "Email Address",
                name: "email",
                errorMessage: "Email address is required",
                isRequired: true,
                placeholder: "Email Address",
              },
              {
                label: "Password",
                name: "password",
                type: "Password",
                errorMessage: "Password is required",
                isRequired: true,
                placeholder: "******",
              },
            ]}
          >
            <Button type="submit">Submit</Button>
          </FormGroupProvider> */}
          <FormStandard />
        </Stack>
      </Center>
    </>
  );
};

export default TestAround;
