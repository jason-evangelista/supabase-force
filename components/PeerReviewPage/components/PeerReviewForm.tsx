import { FC } from "react";
import { Card, Divider, Title, Button } from "@mantine/core";
import { useForm, FormProvider } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import PeerReviewFormBody from "../type/peer.review.form";
import AssistsPeerFormGroup from "./forms/AssistsPeerFormGroup";
import DocumentationFormGroup from "./forms/DocumentationFormGroup";
import NameForm from "./forms/NameForm";
import OptionalFormGroup from "./forms/OptionalFormGroup";
import PresentationFormGroup from "./forms/PresentationFormGroup";
import TechnicalFormGroup from "./forms/TechnicaFormGroup";
import serviceSavePeerReview from "../service/serviceSavePeerReview";

const PeerReviewForm: FC = () => {
  const router = useRouter();
  const methods = useForm<PeerReviewFormBody>();
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitPeerReview = async () => {
    const data = getValues();
    try {
      await serviceSavePeerReview(data);
      router.push("/p/dashboard");
    } catch (e) {
      const error = e as AxiosError;
      const { message } = error.response?.data as { message: string };
      showNotification({
        title: "Error saving peer review",
        message,
        color: "red",
      });
    }
  };

  return (
    <Card shadow="sm" sx={{ width: "40rem" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitPeerReview)}>
          <NameForm />
          <Divider
            label={
              <Title order={6} color="dimmed">
                Required Rating
              </Title>
            }
            labelPosition="center"
            my="md"
          />
          <PresentationFormGroup />
          <Divider my="md" />
          <TechnicalFormGroup />
          <Divider my="md" />
          <AssistsPeerFormGroup />
          <Divider my="md" />
          <DocumentationFormGroup />
          <Divider
            label={
              <Title order={6} color="dimmed">
                Optional Rating
              </Title>
            }
            labelPosition="center"
            my="md"
          />
          <OptionalFormGroup />
          <Button type="submit" mt="lg" loading={isSubmitting} fullWidth>
            Save Review
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default PeerReviewForm;
