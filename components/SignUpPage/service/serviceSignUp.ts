import FormField from "@type/form.field";
import axios from "axios";

const serviceSignUp = async (body: FormField) => {
  const data = await axios.post("/api/sign-up", { ...body });
  return data;
};

export default serviceSignUp;
