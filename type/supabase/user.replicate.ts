import type { Database } from "@utils/database.types";

type UserReplicate = Database["public"]["Tables"]["user_profile"]["Row"];

export default UserReplicate;
