import {
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Button,
  Divider,
  Card,
} from "@mantine/core";
import { FC, FormEvent } from "react";
import { useForm } from "react-hook-form";

import FormField from "@type/form.field";
import serviceSignUp from "../service/serviceSignUp";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

const SignUpForm: FC = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm<FormField>();

  const watchField = watch();

  const emailRef = register("email", { required: "Email is required" });
  const passwordRef = register("password", {
    required: "Password is required",
  });

  const confirmPasswordRef = register("confirmPassword", {
    required: "Password do not match",
    onChange: (e: FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      if (value === watchField.password) return clearErrors("confirmPassword");
      setError("confirmPassword", { message: "Password do not matched" });
    },
  });

  const handleSignUpSubmit = async () => {
    const payload = getValues();
    try {
      await serviceSignUp(payload);
      router.replace("/sign-in");
      return;
    } catch (e) {
      showNotification({
        title: "Oopps..",
        message: "Error creating your account",
        color: "red",
      });
    }
    return;
  };

  return (
    <Card p="xl" shadow="lg">
      <form onSubmit={handleSubmit(handleSignUpSubmit)}>
        <Stack>
          <Text weight={700} size="xl">
            Create your account
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
          <PasswordInput
            label="Confirm password"
            ref={confirmPasswordRef.ref}
            onChange={confirmPasswordRef.onChange}
            name={confirmPasswordRef.name}
            placeholder="********"
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" loading={isSubmitting} mt="sm">
            Create my account
          </Button>
          <Divider label="Already have an account?" labelPosition="center" />
          <Button
            component={NextLink}
            href="/sign-in"
            passHref
            legacyBehavior
            variant="outline"
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default SignUpForm;
