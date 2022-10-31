import { Card, Image, Text, Group, Badge, Box, Divider } from "@mantine/core";
import { format } from "date-fns";
import { FC } from "react";

type Props = {
  id: string;
  image: string;
  isPublic: boolean;
  description: string;
  compressAction: string;
  createdBy: string;
  createdAt: string;
};

const ImagePostCard: FC<Props> = (props) => {
  const { compressAction, createdBy, description, image, isPublic, createdAt } =
    props;
  return (
    <Card withBorder shadow="md" sx={{ width: "25rem" }}>
      <Card.Section mb="sm">
        <Image src={image} alt={createdBy} height={230} fit="cover" />
      </Card.Section>
      <Group mb="sm" position="apart">
        <Badge color="green">{createdBy}</Badge>
        <Badge>{format(new Date(createdAt), "EEE, MMMM dd, yyyy")}</Badge>
      </Group>
      <Divider my="sm" />
      <Box mb="sm">
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </Box>
      <Group>
        <Badge color={isPublic ? "blue" : "green"}>
          {isPublic ? "Public" : "Private"}
        </Badge>
        <Badge color="red">{compressAction}</Badge>
      </Group>
    </Card>
  );
};

export default ImagePostCard;
