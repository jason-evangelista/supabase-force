import { ChangeEvent, FC, useEffect, useRef } from "react";
import {
  Center,
  Stack,
  TextInput,
  Textarea,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import {
  useLocalStorage,
  useDebouncedState,
  useEventListener,
} from "@mantine/hooks";
import { cleanNotifications, showNotification } from "@mantine/notifications";

type InputEvent = ChangeEvent<HTMLInputElement>;
type FormField = {
  username: string;
  feedback: string;
};

const SaveDraftPageDebounce: FC = () => {
  const [userNameLS, setUsernameLS, removeUserNameLS] = useLocalStorage({
    key: "debounce-username",
  });

  const { register, handleSubmit, getValues, watch, setValue } =
    useForm<FormField>();
  const userNameWatch = watch("username");

  const isMounted = useRef<boolean>(false);
  const isFirstVisit = useRef<boolean>(true);

  const [debounceUsername, setDebounceUsername] = useDebouncedState(
    userNameWatch,
    300
  );

  const handleOnSubmit = () => {
    console.log(getValues());
  };

  const handleLoadDrafState = () => {
    setValue("username", userNameLS);
    cleanNotifications();
  };
  const onDraftApply = useEventListener("click", handleLoadDrafState);

  useEffect(() => {
    if (!isMounted.current) return;
    setUsernameLS(debounceUsername);
  }, [debounceUsername, setUsernameLS]);

  useEffect(() => {
    if (!isFirstVisit.current) return;
    if (!userNameLS) return;
    showNotification({
      title: "Apply Draft",
      message: (
        <Stack>
          <Text size="sm" color="dimmed">
            Do you want to apply your previous work?
          </Text>
          <Button size="xs" ref={onDraftApply}>
            Yes
          </Button>
        </Stack>
      ),
      onClose: () => {
        removeUserNameLS();
        cleanNotifications();
      },
      autoClose: false,
    });
  }, [onDraftApply, removeUserNameLS, userNameLS]);

  return (
    <Center sx={{ height: "90vh" }}>
      <Stack>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <TextInput
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              onChange: (e: InputEvent) => {
                setDebounceUsername(e.currentTarget.value);
                isMounted.current = true;
                isFirstVisit.current = false;
              },
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
          </Group>
        </form>
      </Stack>
    </Center>
  );
};

export default SaveDraftPageDebounce;
