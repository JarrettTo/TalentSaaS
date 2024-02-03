import { Button } from "@mantine/core";
import { emailSchema, passwordSchema, useAuth } from "@shared/lib/utils";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, TypeOf } from "zod";
import authApi from "@features/auth/api/auth.api";
import { FormPasswordInput, FormTextInput } from "@shared/ui/form-elements";

const LoginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterInput = TypeOf<typeof LoginFormSchema>;

interface ILoginFormProps {
  onUnverifiedError: (unverifiedEmail: string) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  const { onUnverifiedError } = props;

  const { login } = useAuth();

  const methods = useForm<RegisterInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const loginUser: SubmitHandler<RegisterInput> = async (data) => {
    try {
      const response = await authApi.post("/auth/sign-in", {
        email: data.email,
        password: data.password,
      });
      const responseData = {
        email: data.email,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      login(responseData);
    } catch (error: any) {
      if (error.response?.data?.errorMessage?.includes("not verified")) {
        onUnverifiedError(data.email);
      }
      setError("root", {
        message: error.response.data.errorMessage ?? "Authentication error",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    loginUser(values);
  };

  return (
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
            Log in
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
