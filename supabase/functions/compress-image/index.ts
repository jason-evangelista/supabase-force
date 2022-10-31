const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Authorization, x-client-info, apikey, content-type, content-length, accept",
};

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { Buffer } from "https://deno.land/std@0.161.0/streams/mod.ts";
import * as imagescript from "https://deno.land/x/imagescript@v1.2.14/mod.ts";

console.log({ env: Deno.env.get("SECRET_ANON_KEY") });

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }
  try {
    const data = await req.blob();

    if (!data) {
      return new Response(
        JSON.stringify({ name: "Please provide Blob or File type" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const bufferImage = new Buffer(await data.arrayBuffer()).bytes();

    const newImage = await (
      await imagescript.Image.decode(bufferImage)
    ).encodeJPEG(25);

    console.log({
      newImage: new Blob([newImage], {
        type: "image/jpeg",
      }),
    });

    return new Response(
      new Blob([newImage], {
        type: "image/jpeg",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/octet-stream" },
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: e }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 401,
    });
  }
});
