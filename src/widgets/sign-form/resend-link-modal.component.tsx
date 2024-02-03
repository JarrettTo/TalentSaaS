import authApi from "@features/auth/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "@mantine/core";
import { emailSchema } from "@shared/lib/utils";
import { FormTextInput } from "@shared/ui";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { TypeOf, z } from "zod";

interface IResendLinkModalProps {
  action: "reset" | "resend";
  opened: boolean;
  close: () => void;
  defaultResendEmail?: string;
}

const LoginFormSchema = z.object({
  email: emailSchema,
});

export type RegisterInput = TypeOf<typeof LoginFormSchema>;

export const ResendLinkModal = (props: IResendLinkModalProps) => {
  const { opened, close, action, defaultResendEmail } = props;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  const [isSuccessModalContent, setIsSuccessModalContent] = useState(false);

  const { reset, setError, setValue, handleSubmit } = methods;

  useEffect(() => {
    if (opened) {
      setIsSuccessModalContent(false);
    }
    if (defaultResendEmail) {
      setValue("email", defaultResendEmail, { shouldDirty: true, shouldTouch: true });
    }
  }, [opened]);

  const submitForm = async (email: string) => {
    try {
      if (action === "resend") {
        await authApi.post("/auth/resend-email-token/ ", { email: email });
      } else {
        await authApi.post("/auth/forgot-password", { email: email });
      }
      setIsSuccessModalContent(true);
      reset();
    } catch (error: any) {
      if (error?.response?.data?.errorMessage?.includes("not found")) {
        setError("email", {
          message: "This is not a valid email.",
        });
        return;
      }
      setError("root", {
        message: error.response.data.errorMessage ?? "Error, try again later",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (data) => {
    submitForm(data.email);
  };

  const handleClose = () => {
    reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={handleClose} centered size="md">
      {!isSuccessModalContent && (
        <FormProvider {...methods}>
          <div className="mb-2 text-lg">
            {action === "resend"
              ? "We need your email to resend verify link"
              : "We need your email to request password changing"}
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormTextInput name="email" autoComplete="on" required placeholder="Email" />
            <Button color="orange" className="mt-4 w-full" type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      )}
      {isSuccessModalContent && (
        <p className="mb-8 text-xl text-center">Success! Check your email</p>
      )}
    </Modal>
  );
};
