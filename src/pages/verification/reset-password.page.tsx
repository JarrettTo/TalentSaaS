import { NewPasswordForm } from "@widgets/new-password-form";

export const ResetPasswordPage = () => {
  return (
    <div className="h-screen bg-purple flex flex-col justify-center">
      <div className="container">
        <h1 className="text-2xl text-center leading-none mb-8">
          Create your new password
        </h1>
        <div className="max-w-sm mx-auto">
          <NewPasswordForm />
        </div>
      </div>
    </div>
  );
};
