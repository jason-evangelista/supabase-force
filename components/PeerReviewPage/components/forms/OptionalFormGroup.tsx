import PeerReviewFormBody from "@components/PeerReviewPage/type/peer.review.form";
import { Stack, Textarea } from "@mantine/core";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type OptionalForm = Pick<PeerReviewFormBody, "stood_out_comment">;

const OptionalFormGroup: FC = () => {
  const { register } = useFormContext<OptionalForm>();

  const stoodOutRef = register("stood_out_comment");

  return (
    <Stack>
      <Textarea
        placeholder="Stood out comment"
        autosize
        maxRows={7}
        minRows={3}
        ref={stoodOutRef.ref}
        name={stoodOutRef.name}
        onChange={stoodOutRef.onChange}
      />
    </Stack>
  );
};

export default OptionalFormGroup;
