import { FC } from "react";
import { Box, Group, Menu, Text, Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import UserReplicate from "@type/supabase/user.replicate";
import serviceSignOut from "./service/serviceSignOut";

type Props = {
  user: UserReplicate;
};

const NavBar: FC<Props> = (props) => {
  const handleSignOut = async () => {
    try {
      await serviceSignOut();
      window.location.reload();
    } catch (e) {
      showNotification({
        title: "Sign out Failed",
        message: "Something went wrong when signing out your account.",
        color: "red",
      });
    }
  };

  const { user } = props;
  return (
    <Group my="xl" position="apart" mb="xl">
      <Box>
        <Text variant="gradient" weight={700} size={24} color="blue">
          Project 2
        </Text>
      </Box>
      <Group>
        <Button
          variant="outline"
          compact
          component={NextLink}
          href="/p/dashboard"
          legacyBehavior
          passHref
        >
          Home
        </Button>
        <Button
          variant="outline"
          compact
          component={NextLink}
          href="/p/upload-image"
          legacyBehavior
          passHref
        >
          Upload Image
        </Button>
        <Menu width="10rem">
          <Menu.Target>
            <Button variant="gradient" compact>
              {user.user_name}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handleSignOut}>Sign Out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default NavBar;
