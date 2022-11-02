import { NextApiRequest, NextApiResponse } from "next";
import verifyUserSession from "@utils/api/verifyUserSession";
import UploadImageForm from "@components/UploadImagePage/type/upload.image.form";
import recordApiAnalytics from "@utils/recordApiAnalytics";

type OverrideBodyReq = UploadImageForm & {
  imagePath: string;
};

const EXPIRE_IN = 240 * 3600;

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, supabaseServer, error } = await verifyUserSession(req, res);

  if (!user) return res.status(401).json({ message: "Unauthorized" });
  if (error) return res.status(400).json({ error });

  if (req.method !== "POST")
    return res
      .status(400)
      .json({ message: "This api call is only available for POST" });
  try {
    const bodyPayload = req.body as OverrideBodyReq;
    const { data, error: signImgError } = await supabaseServer.storage
      .from("images")
      .createSignedUrl(bodyPayload.imagePath, EXPIRE_IN);
    console.log({ signImgError, data });

    const { error } = await supabaseServer.rpc("insert_image_post", {
      image_url: data?.signedUrl || "",
      description: bodyPayload.description,
      compress_action: bodyPayload.compressAction,
      created_by: user.id,
      is_public: bodyPayload.isPublic,
    });

    if (error) return res.status(400).json({ message: error.message });

    const apiPath = `${req.method} ${req.url}`;
    await recordApiAnalytics(apiPath, user.id);
    return res
      .status(200)
      .json({ message: "Successfully insert", redirectUrl: "/p/dashboard" });
  } catch (e) {}

  return res.status(200).json({});
};

export default uploadImage;
