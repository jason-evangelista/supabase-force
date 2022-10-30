import {
  Stack,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Divider,
  Card,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import serviceSignIn from "../service/serviceSignIn";
import FormField from "@type/form.field";

type FormFieldSignIn = Pick<FormField, "email" | "password">;

const SignInForm: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormFieldSignIn>();

  const emailRef = register("email", { required: "Email isn required" });
  const passwordRef = register("password", {
    required: "Password is required",
  });

  const handleOnSignIn = async () => {
    const payload = getValues();
    try {
      const { data } = await serviceSignIn(payload);
      return router.replace(data.authUrl);
    } catch (e) {
      const error = e as AxiosError;
      const { message } = error.response?.data as { message: string };
      showNotification({
        title: "Sign in Failed",
        message: message,
        color: "red",
      });
    }
  };

  return (
    <Card shadow="lg" p="xl">
      <form onSubmit={handleSubmit(handleOnSignIn)}>
        <Stack>
          <Text weight={700} size="xl">
            Sign in your account
          </Text>
          <TextInput
            label="Email address"
            type="email"
            ref={emailRef.ref}
            onChange={emailRef.onChange}
            name={emailRef.name}
            placeholder="example@hostname.com"
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            ref={passwordRef.ref}
            onChange={passwordRef.onChange}
            name={passwordRef.name}
            placeholder="********"
            error={errors.password?.message}
          />
          <Button type="submit" loading={isSubmitting} mt="sm">
            Sign in
          </Button>
          <Divider label="OR" labelPosition="center" />
          <Button
            variant="outline"
            href="/sign-up"
            component={NextLink}
            legacyBehavior
            passHref
          >
            Create your account here
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default SignInForm;
