import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@type/database.types";
import { NextApiRequest, NextApiResponse } from "next";

const callEdge = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient<Database>({ req, res });

  const { data, error } = await supabaseServer.functions.invoke(
    "edge-instance",
    {
      body: { name: "JASON" },
    }
  );

  if (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
  return res.status(200).json({ data });
};

export default callEdge;
