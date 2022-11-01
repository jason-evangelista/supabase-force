import PeerReviewFormBody from "@components/PeerReviewPage/type/peer.review.form";
import { Stack, Title, Textarea } from "@mantine/core";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import ScoreSlider from "../ScoreSlider";

type TechnicalForm = Pick<
  PeerReviewFormBody,
  "technical_score" | "technical_comment"
>;

const TechnicalFormGroup: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TechnicalForm>();

  const scoreRef = register("technical_score");
  const commentRef = register("technical_comment", {
    required: "Give atleast 1-2 sentence comment",
  });

  return (
    <Stack>
      <Title order={6}>Technical</Title>
      <ScoreSlider
        label="Technical Score"
        name={scoreRef.name}
        ref={scoreRef.ref}
        onChange={(v) => setValue("technical_score", v)}
      />
      <Textarea
        autosize
        placeholder="Technical Comment..."
        maxRows={8}
        minRows={3}
        ref={commentRef.ref}
        name={commentRef.name}
        onChange={commentRef.onChange}
        error={errors.technical_comment?.message}
      />
    </Stack>
  );
};

export default TechnicalFormGroup;
