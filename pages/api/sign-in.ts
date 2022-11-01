import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import FormField from "@type/form.field";
import recordApiAnalytics from "@utils/recordApiAnalytics";

type BodyPayload = Pick<FormField, "email" | "password">;

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });

  if (req.method !== "POST")
    return res.status(400).json({
      message: "This api call is only available for GET",
    });

  try {
    const { email, password } = req.body as BodyPayload;

    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });
    if (data) {
      const { user } = data;
      const apiPath = `${req.method} ${req.url}`;
      await recordApiAnalytics(apiPath, user?.id || "");
    }
    if (error) return res.status(401).json({ message: error.message });
    return res.status(200).json({ data, authUrl: "/p/dashboard" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export default signIn;
