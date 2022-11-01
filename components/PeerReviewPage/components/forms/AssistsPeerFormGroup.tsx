import PeerReviewFormBody from "@components/PeerReviewPage/type/peer.review.form";
import { Stack, Title, Textarea } from "@mantine/core";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import ScoreSlider from "../ScoreSlider";

type AssistsPeer = Pick<
  PeerReviewFormBody,
  "assists_peer_score" | "assists_peer_comment"
>;

const AssistsPeerFormGroup: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<AssistsPeer>();

  const scoreRef = register("assists_peer_score");
  const commentRef = register("assists_peer_comment", {
    required: "Give atleast 1-2 sentence comment",
  });

  return (
    <Stack>
      <Title order={6}>Assists Peer</Title>
      <ScoreSlider
        label="Assists Peer Score"
        ref={scoreRef.ref}
        name={scoreRef.name}
        onChange={(v) => setValue("assists_peer_score", v)}
      />
      <Textarea
        autosize
        placeholder="Assists Peer Comment..."
        maxRows={8}
        minRows={3}
        ref={commentRef.ref}
        name={commentRef.name}
        onChange={commentRef.onChange}
        error={errors.assists_peer_comment?.message}
      />
    </Stack>
  );
};

export default AssistsPeerFormGroup;
