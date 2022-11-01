import { Container } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

import NavBar from "./Navbar";
import UserReplicate from "@type/supabase/user.replicate";

type Props = PropsWithChildren & {
  user?: UserReplicate;
};

const Layout: FC<Props> = (props) => {
  const { children, user } = props;
  return (
    <Container size="xl">
      {user && <NavBar user={user} />}
      {children}
    </Container>
  );
};

export default Layout;
