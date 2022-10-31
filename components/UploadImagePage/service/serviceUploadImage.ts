import { SupabaseClient } from "@supabase/auth-helpers-react";
import CompressAction from "../type/compress.action";
import UploadImageForm from "../type/upload.image.form";
import axios from "axios";
import uploadWithUnsignImage from "../utils/uploadWithUnsignImage";
import compressImageClientSide from "../utils/compressImageClientSide";

const CREATE_IMAGE_POST_URL = "/api/create-image-post";

const serviceUploadImage = async (
  body: UploadImageForm,
  compressAction: CompressAction,
  supabaseClient: SupabaseClient
) => {
  const { image } = body;

  if (compressAction === "client-side-compression") {
    const file = await compressImageClientSide(image);
    const { data: imageData } = await uploadWithUnsignImage(
      file,
      supabaseClient
    );
    const data = await axios.post(CREATE_IMAGE_POST_URL, {
      ...body,
      imagePath: imageData?.path,
    });

    return data;
  }

  if (compressAction === "no-compression") {
    const { data: imageData } = await uploadWithUnsignImage(
      image,
      supabaseClient
    );
    const data = await axios.post(CREATE_IMAGE_POST_URL, {
      ...body,
      imagePath: imageData?.path,
    });
    return data;
  }

  if (compressAction === "supabase-server-compression") {
    const { data: compressImageData } = await supabaseClient.functions.invoke(
      "compress-image",
      {
        body: image,
      }
    );

    const { data: imageData } = await uploadWithUnsignImage(
      compressImageData as File | Blob,
      supabaseClient
    );
    const data = await axios.post(CREATE_IMAGE_POST_URL, {
      ...body,
      imagePath: imageData?.path,
    });
    return data;
  }
};

export default serviceUploadImage;
