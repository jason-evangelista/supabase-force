import { PasswordInput, Stack, TextInput } from "@mantine/core";
import { FC, FormEvent, PropsWithChildren } from "react";
import { Controller, Control } from "react-hook-form";

type InputType =
  | "Text"
  | "Password"
  | "Number"
  | "Date"
  | "DateRange"
  | "Time"
  | "Email"
  | "Select"
  | "Multiple";

type InputBuilder = {
  type: InputType;
  isRequired?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
};

type Props = PropsWithChildren & {
  inputNode: InputBuilder[];
  control: Control;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const FormGroupProvider: FC<Props> = (props) => {
  const { inputNode, control, handleSubmit, children } = props;

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        {inputNode.map((item) => {
          if (item.type === "Email") {
            return (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                render={({ field, fieldState }) => (
                  <TextInput
                    placeholder={item.placeholder}
                    type="email"
                    my="sm"
                    error={fieldState.error?.message}
                    ref={field.ref}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
                rules={{
                  required: item.isRequired ? item.errorMessage : false,
                }}
              />
            );
          }
          if (item.type === "Password") {
            return (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                render={({ field, fieldState }) => (
                  <PasswordInput
                    placeholder={item.placeholder}
                    type="password"
                    my="sm"
                    error={fieldState.error?.message}
                    ref={field.ref}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
                rules={{
                  required: item.isRequired ? item.errorMessage : false,
                }}
              />
            );
          }
        })}
        {children}
      </form>
    </Stack>
  );
};

export default FormGroupProvider;
