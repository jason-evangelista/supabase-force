import { FC, useEffect, useRef } from "react";
import {
  Button,
  Center,
  Stack,
  TextInput,
  Text,
  Group,
  Textarea,
} from "@mantine/core";
import { showNotification, cleanNotifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useLocalStorage, useEventListener } from "@mantine/hooks";
import { useBeforeunload } from "react-beforeunload";

type FormField = {
  username: string;
  feedback: string;
};

const SaveDraftPageBeforeUnload: FC = () => {
  const { handleSubmit, register, watch, getValues, setValue } =
    useForm<FormField>();
  const { feedback, username } = watch();
  const draftToggle = useRef<boolean>(false);
  const [userNameLS, setUserNameLS, removeUserNameLS] = useLocalStorage({
    key: "username",
  });

  const handleOnSubmit = async () => {
    console.log(getValues());
    removeUserNameLS();
  };

  const handleSaveDraftState = () => {
    const { username } = getValues();
    setUserNameLS(username);
    draftToggle.current = true;
    cleanNotifications();
  };

  const handleOpenSaveDraftAlert = () => {
    showNotification({
      message: (
        <Stack>
          <Text>Are you sure you want to save to draft?</Text>
          <Group position="left">
            <Button size="xs" onClick={handleSaveDraftState}>
              Save
            </Button>
          </Group>
        </Stack>
      ),
      title: (
        <Text size="sm" weight={700}>
          Save as Draft
        </Text>
      ),
      onClose: () => {
        removeUserNameLS();
        draftToggle.current = true;
        cleanNotifications();
      },
      autoClose: false,
    });
  };

  const handleLoadDraftState = () => {
    setValue("username", userNameLS);
    cleanNotifications();
  };

  const onDraftApply = useEventListener("click", handleLoadDraftState);

  useEffect(() => {
    if (!localStorage.length) return;
    showNotification({
      message: (
        <Stack>
          <Text>Apply previous work?</Text>
          <Group position="left">
            <Button size="xs" ref={onDraftApply}>
              Save
            </Button>
          </Group>
        </Stack>
      ),
      title: (
        <Text size="sm" weight={700}>
          Apply Draft
        </Text>
      ),
      onClose: () => {
        removeUserNameLS();
        cleanNotifications();
      },
      autoClose: false,
    });
  }, [onDraftApply, removeUserNameLS]);

  useBeforeunload((event) => {
    if (draftToggle.current) return event;
    if (feedback || username) {
      return event.preventDefault();
    }
  });

  return (
    <>
      <Center sx={{ height: "90vh" }}>
        <Stack>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextInput
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
              mb="md"
            />
            <Textarea
              placeholder="Feedback"
              {...register("feedback", { required: "Please give a feedback" })}
              mb="md"
            />
            <Group position="apart">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={handleOpenSaveDraftAlert}>
                Save as Draft
              </Button>
            </Group>
          </form>
        </Stack>
      </Center>
    </>
  );
};

export default SaveDraftPageBeforeUnload;
