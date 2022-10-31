import type { Database } from "@utils/database.types";

type ImagePostItem = Database["public"]["Tables"]["image_post"]["Row"];
type UserProfileItem = Database["public"]["Tables"]["user_profile"]["Row"];

type ImagePost = ImagePostItem & {
  user_profile: Pick<UserProfileItem, "user_name">;
};

export default ImagePost;
