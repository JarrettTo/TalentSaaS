import authApi from "@features/auth/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "@mantine/core";
import { passwordSchema } from "@shared/lib/utils";
import { FormPasswordInput } from "@shared/ui";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TypeOf, z } from "zod";

const NewPasswordSchema = z.object({
  password: passwordSchema,
  passwordConfirm: passwordSchema,
});

export type RegisterInput = TypeOf<typeof NewPasswordSchema>;

export const NewPasswordForm = () => {
  const methods = useForm<RegisterInput>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(NewPasswordSchema),
  });

  const { verificationCode } = useParams();
  const navigate = useNavigate();

  const { setError, handleSubmit, watch } = methods;

  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const registerUser = async (data: RegisterInput) => {
    try {
      await authApi.post("/auth/reset-password", {
        password: data.password,
        code: verificationCode,
      });
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      setError("root", {
        message: error.response.data.errorMessage ?? "Error, try again later",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    if (isPasswordMatched === false) {
      setError("passwordConfirm", { message: "Passwords don't match" });
      return;
    }
    registerUser(values);
  };

  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");

  useEffect(() => {
    if (passwordValue === passwordConfirmValue) {
      setIsPasswordMatched(true);
    } else {
      setIsPasswordMatched(false);
    }
  }, [passwordValue, passwordConfirmValue]);

  const handleModalClose = () => {
    close();
    navigate("/login");
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <div className="mb-2">
              <FormPasswordInput name="password" required placeholder="Password" />
            </div>
            <div className="mb-2">
              <FormPasswordInput
                name="passwordConfirm"
                required
                placeholder="Confirm password"
              />
            </div>
          </div>
          <Button className="w-full mb-1" color="orange" type="submit">
            Sign Up
          </Button>
          <div className="text-center h-[1.25rem] text-sm text-error">
            {!isPasswordMatched && "Passwords don't match"}
          </div>
        </form>
      </FormProvider>

      <Modal
        opened={isSuccessModalOpen}
        onClose={() => handleModalClose()}
        centered
        size="md"
      >
        <p className="mb-8 text-xl text-center">
          You have successfully changed your password
        </p>
      </Modal>
    </>
  );
};
