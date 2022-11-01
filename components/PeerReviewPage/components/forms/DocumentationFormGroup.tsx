import PeerReviewFormBody from "@components/PeerReviewPage/type/peer.review.form";
import { Stack, Title, Textarea } from "@mantine/core";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import ScoreSlider from "../ScoreSlider";

type DocumentationForm = Pick<
  PeerReviewFormBody,
  "documentation_score" | "documentation_comment"
>;

const DocumentationFormGroup: FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<DocumentationForm>();

  const scoreRef = register("documentation_score");
  const commentRef = register("documentation_comment", {
    required: "Give atleast 1-2 sentence comment",
  });

  return (
    <Stack>
      <Title order={6}>Documentation</Title>
      <ScoreSlider
        label="Documentation Score"
        ref={scoreRef.ref}
        name={scoreRef.name}
        onChange={(v) => setValue("documentation_score", v)}
      />
      <Textarea
        autosize
        placeholder="Documentation Comment..."
        maxRows={8}
        minRows={3}
        ref={commentRef.ref}
        name={commentRef.name}
        onChange={commentRef.onChange}
        error={errors.documentation_comment?.message}
      />
    </Stack>
  );
};

export default DocumentationFormGroup;
