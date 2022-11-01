import {
  createServerSupabaseClient,
  SupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { Database } from "@type/database.types";
import { NextApiRequest, NextApiResponse } from "next";

const verifyUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{
  user: User | undefined;
  supabaseServer: SupabaseClient<Database>;
  error: AuthError | null;
}> => {
  const supabaseServer = createServerSupabaseClient<Database>({ req, res });
  const {
    data: { session },
    error,
  } = await supabaseServer.auth.getSession();

  return {
    user: session?.user,
    error,
    supabaseServer: supabaseServer,
  };
};

export default verifyUserSession;
