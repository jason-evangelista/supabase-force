import { FC } from "react";
import { Textarea, TextInput } from "@mantine/core";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type Field = {
  username: string;
  comment: string;
};

const FormStandard: FC = () => {
  const method = useForm<Field>();
  const { handleSubmit, getValues } = method;

  const handleOnSumbit = async () => {
    console.log(getValues());
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(handleOnSumbit)}>
        <Username />
        <Comment />
      </form>
    </FormProvider>
  );
};

export const Comment: FC = () => {
  const { register } = useFormContext<Field>();
  return <Textarea placeholder="Comment" {...register("comment")} />;
};

export const Username: FC = () => {
  const { register } = useFormContext<Field>();
  return <TextInput placeholder="Username" {...register("username")} />;
};

export default FormStandard;
