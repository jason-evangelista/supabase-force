import PeerReviewFormBody from "@components/PeerReviewPage/type/peer.review.form";
import { Stack, Title, Textarea } from "@mantine/core";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import ScoreSlider from "../ScoreSlider";

type PresentationForm = Pick<
  PeerReviewFormBody,
  "presentation_score" | "presentation_comment"
>;

const PresentationFormGroup: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PresentationForm>();

  const scoreRef = register("presentation_score");
  const commentRef = register("presentation_comment", {
    required: "Give atleast 1-2 sentence comment",
  });

  return (
    <Stack>
      <Title order={6}>Presentation</Title>
      <ScoreSlider
        label="Presentaion Score"
        ref={scoreRef.ref}
        name={scoreRef.name}
        onChange={(v) => setValue("presentation_score", v)}
      />
      <Textarea
        ref={commentRef.ref}
        name={commentRef.name}
        onChange={commentRef.onChange}
        placeholder="Presentation Comment..."
        autosize
        maxRows={8}
        minRows={3}
        error={errors.presentation_comment?.message}
      />
    </Stack>
  );
};

export default PresentationFormGroup;
