import { Modal, Button } from "@mantine/core";
import { tryDeleteAccount } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type IDeleteAccountModalProps = {
  influencerID: number;
  opened: boolean;
  close: () => void;
};

export const DeleteAccountModal = (props: IDeleteAccountModalProps) => {
  const { influencerID, opened, close } = props;
  const navigate = useNavigate();

  const onDeleteAccountHandler = async () => {
    try {
      await tryDeleteAccount(influencerID);

      toast.success(
        "The influencer was successfully deleted. After 3 seconds you will be redirected to the main page",
        { autoClose: 3000 }
      );

      setTimeout(() => {
        navigate("/app");
      }, 4000);
    } catch (error) {
      toast.error("Error on deleting influencer");
    } finally {
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <div>
        <div className="text-center text-2xl mb-6">
          Are you really want to delete this account?
        </div>
        <div className="flex space-x-8">
          <Button
            className="w-full mb-3 max-w-[15rem]"
            color="red"
            radius="lg"
            onClick={onDeleteAccountHandler}
          >
            Yes
          </Button>
          <Button
            className="w-full mb-3 max-w-[15rem]"
            color="gray"
            radius="lg"
            onClick={() => close()}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};
