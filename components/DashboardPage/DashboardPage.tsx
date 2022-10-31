import { Center } from "@mantine/core";
import { FC } from "react";
import ImagePost from "@type/supabase/image.post";
import ImagePostList from "./components/ImagePostList";

type Props = {
  imagePost: ImagePost[];
};

const DashboardPage: FC<Props> = (props) => {
  const { imagePost } = props;
  return (
    <Center>
      <ImagePostList imagePost={imagePost} />
    </Center>
  );
};

export default DashboardPage;
