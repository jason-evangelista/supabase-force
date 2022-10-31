import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

const uploadWithUnsignImage = async (
  file: File | Blob,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${uuid()}-${Date.now()}`, await file.arrayBuffer(), {
      contentType: "image/jpeg",
    });

  return { data, error };
};

export default uploadWithUnsignImage;
