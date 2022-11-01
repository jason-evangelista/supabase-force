import { FC } from "react";
import { Stack } from "@mantine/core";
import ImagePost from "@type/supabase/image.post";
import ImagePostCard from "./ImagePostCard";

type Props = {
  imagePost: ImagePost[];
};

const ImagePostList: FC<Props> = (props) => {
  const { imagePost } = props;
  return (
    <Stack>
      {imagePost.map((item) => (
        <ImagePostCard
          key={item.id}
          id={item.id}
          compressAction={item.compress_action}
          createdBy={item.user_profile.user_name}
          description={item.description}
          image={item.image_url}
          isPublic={item.is_public}
          createdAt={item.created_at}
        />
      ))}
    </Stack>
  );
};

export default ImagePostList;
