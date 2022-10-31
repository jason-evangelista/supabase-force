import "@styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NotificationsProvider } from "@mantine/notifications";

type AppSession = {
  session: Session;
};

const App = ({ Component, pageProps }: AppProps<AppSession>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.session}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default App;
