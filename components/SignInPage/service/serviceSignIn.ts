import FormField from "@type/form.field";
import axios from "axios";

type BodyPayload = Pick<FormField, "email" | "password">;

const serviceSignIn = async (body: BodyPayload) => {
  const data = await axios.post("/api/sign-in", { ...body });
  return data;
};

export default serviceSignIn;
