import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.5.0/mod.ts";
import bodyContent from "../_shared/email/email.tsx";

console.log(await bodyContent({ type: "welcome", params: { name: "Jason" } }));

const smtp = new SMTPClient({
  connection: {
    hostname: Deno.env.get("SMTP_HOSTNAME") || "",
    auth: {
      username: Deno.env.get("SMTP_USERNAME") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    },
    port: Number(Deno.env.get("SMTP_PORT") || ""),
    tls: true,
  },
});

serve(async (req: Request) => {
  try {
    await smtp.send({
      from: Deno.env.get("SMTP_USERNAME") || "",
      to: "evangelistajasonglenn@gmail.com",
      subject: `Hello from Supabase Edge Functions`,
      priority: "high",
      attachments: [],
      html: await bodyContent({
        type: "welcome",
        params: { name: "Jason" },
      }),
    });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
  // await smtp.close();
  return new Response(
    JSON.stringify({
      done: true,
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
});
