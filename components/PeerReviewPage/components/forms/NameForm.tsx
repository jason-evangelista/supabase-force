import { TextInput } from "@mantine/core";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import PeerReviewFormBody from "@components/PeerReviewPage/type/peer.review.form";

type FormName = Pick<PeerReviewFormBody, "name">;

const NameForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormName>();

  const nameRef = register("name", {
    required: "Peer name reviewer is required",
  });

  return (
    <TextInput
      placeholder="Your name"
      label="Your name"
      ref={nameRef.ref}
      name={nameRef.name}
      onChange={nameRef.onChange}
      error={errors.name?.message}
    />
  );
};

export default NameForm;
