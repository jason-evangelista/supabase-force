import type { Database } from "@type/database.types";

type UserReplicate = Database["public"]["Tables"]["user_profile"]["Row"];

export default UserReplicate;
