import { NextApiRequest, NextApiResponse } from "next";
import FormField from "@type/form.field";
import supabaseServiceRole from "@utils/supabaseServiceRole";

type BodyRequest = FormField;

const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res
      .status(401)
      .json({ message: "This api request is only available for POST request" });

  const { email, password, confirmPassword } = req.body as BodyRequest;
  if (password !== confirmPassword)
    return res.status(401).json({ message: "Password do not matched" });

  try {
    console.log(req.body);
    const { data, error } = await supabaseServiceRole.auth.signUp({
      email,
      password,
    });

    if (error) return res.status(401).json({ error });

    const { user } = data;
    const { error: repError } = await supabaseServiceRole.rpc(
      "create_user_replication",
      {
        id: user?.id || "",
        user_email: user?.email || "",
        user_name: user?.email || "",
      }
    );
    console.log(repError);
    if (!repError) {
      return res.status(200).json({ message: "Successfully Registered" });
    } else {
      return res.status(200).json({ error: repError });
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default signUp;
