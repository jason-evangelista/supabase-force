import { Alert, Card, Divider, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { format } from "date-fns";
import PeerReview from "@type/supabase/peer.review";
import ParsePeerReview from "@components/PeerReviewPage/type/parse.peer.review";
import ScoreSlider from "@components/PeerReviewPage/components/ScoreSlider";

type Props = {
  peerReview: PeerReview;
};

const PeerReviewCard: FC<Props> = (props) => {
  const { peerReview } = props;

  const parsePeerReviewInsight = JSON.parse(
    peerReview.review_insight
  ) as ParsePeerReview;

  const { date, name, optional_rating, required_rating } =
    parsePeerReviewInsight;

  return (
    <Card sx={{ width: "25rem" }} shadow="md">
      <Group mb="md">
        <Title order={6} color="dimmed">
          Review By:
        </Title>
        <Title order={6}>{name}</Title>
      </Group>
      <Group mb="md">
        <Title order={6} color="dimmed">
          Published at:
        </Title>
        <Title order={6}>{format(new Date(date), "EEE, MMMM dd, yyyy")}</Title>
      </Group>
      <Stack mb="md">
        <Divider
          label={
            <Title color="dimmed" order={6}>
              Presentation
            </Title>
          }
          labelPosition="center"
          mb="xs"
        />
        <ScoreSlider
          disabled
          color="blue"
          defaultValue={required_rating.presentation_score.score}
          styles={(theme) => ({
            bar: {
              backgroundColor: theme.colors.blue[5],
            },
          })}
        />
        <Alert title="Comment" color="gray">
          {required_rating.presentation_score.comment}
        </Alert>
      </Stack>
      <Stack mb="md">
        <Divider
          label={
            <Title color="dimmed" order={6}>
              Technical
            </Title>
          }
          labelPosition="center"
          mb="xs"
        />
        <ScoreSlider
          disabled
          color="blue"
          defaultValue={required_rating.technical_score.score}
          styles={(theme) => ({
            bar: {
              backgroundColor: theme.colors.blue[5],
            },
          })}
        />
        <Alert title="Comment" color="gray">
          {required_rating.technical_score.comment}
        </Alert>
      </Stack>
      <Stack mb="md">
        <Divider
          label={
            <Title color="dimmed" order={6}>
              Assists Peer
            </Title>
          }
          labelPosition="center"
          mb="xs"
        />
        <ScoreSlider
          disabled
          color="blue"
          defaultValue={required_rating.assists_peers_score.score}
          styles={(theme) => ({
            bar: {
              backgroundColor: theme.colors.blue[5],
            },
          })}
        />
        <Alert title="Comment" color="gray">
          {required_rating.assists_peers_score.comment}
        </Alert>
      </Stack>
      <Stack mb="md">
        <Divider
          label={
            <Title color="dimmed" order={6}>
              Documentation
            </Title>
          }
          labelPosition="center"
          mb="xs"
        />
        <ScoreSlider
          disabled
          color="blue"
          defaultValue={required_rating.documentation_score.score}
          styles={(theme) => ({
            bar: {
              backgroundColor: theme.colors.blue[5],
            },
          })}
        />
        <Alert title="Comment" color="gray">
          {required_rating.documentation_score.comment}
        </Alert>
      </Stack>
      {optional_rating.stood_out && (
        <Stack mb="md">
          <Divider
            label={
              <Title color="dimmed" order={6}>
                Stood Out(Optional)
              </Title>
            }
            labelPosition="center"
            mb="xs"
          />

          <Alert title="Comment" color="gray">
            {optional_rating.stood_out}
          </Alert>
        </Stack>
      )}
    </Card>
  );
};

export default PeerReviewCard;
