import authApi from "@features/auth/api/auth.api";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CopyToClipboardElem from "@shared/ui/copy-clipboard.component";
import { useState } from "react";

export const TotalInsightsHead = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [verifyLink, setVerifyLink] = useState<string>("");

  const generateShareableLink = async () => {
    try {
      const response = await authApi.post(
        "/total-statistic/statistic/verify-code/generate"
      );
      setVerifyLink(`${window.location.origin}/share/insights/${response.data}`);
      open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex text-3xl text-black justify-between items-center">
      <div className="text-black w-fit">Total insights for last 90 days</div>
      <Button size="lg" radius="lg" color="orange" onClick={generateShareableLink}>
        Share Insights
      </Button>
      <Modal opened={opened} onClose={close} centered>
        <div>
          <div className="text-center text-2xl">Send this link to share Insights</div>
          <div className="flex items-center mt-10 border border-solid rounded-sm">
            <div className="overflow-hidden whitespace-nowrap pl-2 font-medium mr-2">
              {verifyLink}
            </div>
            <CopyToClipboardElem text={verifyLink} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
