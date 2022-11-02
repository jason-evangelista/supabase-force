import { FC, FormEvent, useRef } from "react";
import { Stack, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import ImagePost from "@type/supabase/image.post";
import ImagePostCard from "./ImagePostCard";

type Props = {
  imagePost: ImagePost[];
};

const ImagePostList: FC<Props> = (props) => {
  const router = useRouter();
  const { imagePost } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchInputRef.current?.value;
    router.replace({
      query: {
        ...router.query,
        searchQuery: query,
      },
    });
  };

  return (
    <Stack>
      <form onSubmit={handleSearch}>
        <TextInput ref={searchInputRef} placeholder="Search for keyword" />
      </form>
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
