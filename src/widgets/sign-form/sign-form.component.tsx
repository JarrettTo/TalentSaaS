import { Button, Modal } from "@mantine/core";
import { emailSchema, passwordSchema } from "@shared/lib/utils";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, TypeOf } from "zod";
import useAuthStore from "@shared/lib/stores/auth-store.hook";
import authApi from "@features/auth/api/auth.api";
import { FormPasswordInput, FormTextInput } from "@shared/ui/form-elements";
import { useState } from "react";

const SignFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterInput = TypeOf<typeof SignFormSchema>;

export const SignForm = () => {
  const store = useAuthStore();
  const methods = useForm<RegisterInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignFormSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const registerUser = async (data: RegisterInput) => {
    try {
      store.setRequestLoading(true);
      await authApi.post("/auth/sign-up", data);
      store.setRequestLoading(false);
      setIsSuccessModalOpen(true);
      reset();
    } catch (error: any) {
      if (error.response?.data?.errorMessage?.includes("exist")) {
        setError("root", {
          message: "Manager already exists",
        });
        return;
      }
      setError("root", {
        message: error.response.data.errorMessage ?? "Authentication error",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-2">
            <FormTextInput name="email" autoComplete="on" required placeholder="Email" />
          </div>
          <div className="mb-2">
            <FormPasswordInput
              name="password"
              autoComplete="on"
              required
              placeholder="Password"
            />
          </div>
          <div className="h-8">
            {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}
          </div>
          <div>
            <Button className="w-full" color="orange" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </FormProvider>

      <Modal
        opened={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        centered
        size="md"
      >
        <p className="mb-8 text-xl text-center">
          Please check your email for the verification link to continue signing up
        </p>
      </Modal>
    </>
  );
};
