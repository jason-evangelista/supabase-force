import { FC, useState } from "react";
import {
  FileInput,
  Image,
  Switch,
  Textarea,
  Button,
  Stack,
  Radio,
  Divider,
  Card,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import compressActionGroup, {
  CompressActionGroup,
} from "../utils/compressActionGroup";
import CompressAction from "../type/compress.action";
import UploadImageForm from "../type/upload.image.form";
import serviceUploadImage from "../service/serviceUploadImage";
import { Database } from "@type/database.types";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { showNotification } from "@mantine/notifications";

const SUPABASE_SERVER_COMPRESSION: CompressAction =
  "supabase-server-compression";

const UploadImageForm: FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient<Database>();
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    setValue,
  } = useForm<UploadImageForm>({
    defaultValues: {
      compressAction: SUPABASE_SERVER_COMPRESSION,
    },
  });

  const [imageSrc, setImageSrc] = useState("");
  const [compressAction] = useState<CompressActionGroup[]>(compressActionGroup);

  const imageRef = register("image", { required: "Image is required" });
  const isPublicRef = register("isPublic");
  const descriptionRef = register("description", {
    required: "Description is required",
  });

  const compressActionRef = register("compressAction");

  const handleOnCompressActionChange = (value: string) => {
    setValue("compressAction", value as CompressAction);
  };

  const onImageSelect = (file: File | null) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file || new Blob());
    fileReader.onload = async () => {
      if (file) {
        setImageSrc(fileReader.result as string);
        setValue("image", file);
      }
    };
  };

  const handleOnSubmitPost = async () => {
    const data = getValues();
    try {
      await serviceUploadImage(data, data.compressAction, supabaseClient);
      router.push("/p/dashboard");
    } catch (e) {
      const error = e as AxiosError;
      const { message } = error.response?.data as { message: string };
      showNotification({
        message: message,
        title: "Error creating your image post",
        color: "red",
      });
    }
  };

  const showImagePlaceHolder = imageSrc ? false : true;

  return (
    <Card shadow="lg">
      <form onSubmit={handleSubmit(handleOnSubmitPost)}>
        <Image
          width={300}
          height={200}
          alt="Upload-image-preview"
          src={imageSrc}
          withPlaceholder={showImagePlaceHolder}
        />
        <Stack>
          <FileInput
            ref={imageRef.ref}
            name={imageRef.name}
            mt="sm"
            size="xs"
            placeholder="Select Image"
            onChange={onImageSelect}
            error={errors.image?.message}
          />
          <Radio.Group
            ref={compressActionRef.ref}
            onChange={handleOnCompressActionChange}
            orientation="vertical"
            spacing="sm"
            label="Image compression option"
            defaultValue={SUPABASE_SERVER_COMPRESSION}
            defaultChecked={true}
          >
            {compressAction.map((item) => (
              <Radio key={item.value} label={item.label} value={item.value} />
            ))}
          </Radio.Group>
        </Stack>
        <Divider my="md" />
        <Switch
          label="Allow my post to be public"
          mb="sm"
          ref={isPublicRef.ref}
          onChange={isPublicRef.onChange}
          name={isPublicRef.name}
        />
        <Textarea
          ref={descriptionRef.ref}
          onChange={descriptionRef.onChange}
          name={descriptionRef.name}
          placeholder="Add image description..."
          autosize
          maxRows={10}
          minRows={3}
          mb="sm"
          error={errors.description?.message}
        />
        <Button type="submit" fullWidth size="xs" loading={isSubmitting}>
          Save Post
        </Button>
      </form>
    </Card>
  );
};

export default UploadImageForm;
