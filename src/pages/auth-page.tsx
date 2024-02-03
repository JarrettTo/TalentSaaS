import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LoginForm } from "@widgets/login-form";
import { ResendLinkModal, SignForm } from "@widgets/sign-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AuthPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [action, setAction] = useState<"reset" | "resend">("resend");
  const [resendEmail, setResendEmail] = useState("");

  const handleUnverifiedError = (unverifiedEmail: string) => {
    setResendEmail(unverifiedEmail);
    setAction("resend");
    open();
  };

  return (
    <div className="h-screen bg-purple flex flex-col justify-center">
      <div className="container">
        <h1 className="text-9xl text-center leading-none mb-8">Jnr.</h1>
        <div className="max-w-sm mx-auto">
          <Tabs className="mb-4" color="orange" defaultValue="login">
            <Tabs.List className="w-fit mx-auto mb-4">
              <Tabs.Tab className="xl:text-xl" value="login">
                Login
              </Tabs.Tab>
              <Tabs.Tab className="xl:text-xl" value="sign-up">
                Sign Up
              </Tabs.Tab>
            </Tabs.List>
            <div>
              <Tabs.Panel value="login">
                <LoginForm onUnverifiedError={handleUnverifiedError} />
              </Tabs.Panel>
              <Tabs.Panel value="sign-up">
                <SignForm />
              </Tabs.Panel>
            </div>
          </Tabs>
          <div className="flex mb-8 justify-center">
            <div
              className="w-fit underline hover:text-orange cursor-pointer"
              onClick={() => {
                setAction("reset");
                open();
              }}
            >
              Forgot your password?
            </div>
          </div>

          <div className="flex flex-col text-center">
            <Link
              className="text-black hover:text-orange  underline-offset-4"
              to="/privacy-policy"
              target="_blank"
            >
              Privacy policy
            </Link>
            <Link
              className="mt-2 text-black hover:text-orange  underline-offset-4"
              to="/terms-of-service"
              target="_blank"
            >
              Terms of Services
            </Link>
          </div>
        </div>
      </div>
      <ResendLinkModal
        action={action}
        opened={opened}
        close={close}
        defaultResendEmail={resendEmail}
      />
    </div>
  );
};
