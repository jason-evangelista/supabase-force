import axios from "axios";

const serviceSignOut = async () => {
  const data = axios.get("/api/sign-out");
  return data;
};

export default serviceSignOut;
