import authApi from "@features/auth/api/auth.api";
import { Button, Modal, clsx } from "@mantine/core";
import { IInfluencer } from "./types";
import { IMAGES_URL } from "@shared/constants/variables";
import { Link } from "react-router-dom";
import {
  tryConnectToInstagram,
  tryConnectToYoutube,
  tryDisconnectYoutube,
  tryDisconnectInstagram,
  tryConnectToTikTok,
  tryDisconnectTiktok,
} from "@features/profile/api";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import CopyToClipboardElem from "@shared/ui/copy-clipboard.component";

type InfluencerSidebarProps = {
  influencer: IInfluencer;
  onUpdateAvatar: () => void;
  page: string;
  updatePage: (newPage: string)=>void;
};

export const InfluencerSidebar: React.FC<InfluencerSidebarProps> = (props) => {
  const { influencer, onUpdateAvatar, page, updatePage } = props;

  const [opened, { open, close }] = useDisclosure(false);

  const [openedDisconnect, { open: openDisconnect, close: closeDisconnect }] =
    useDisclosure(false);
  const [disconnectLabel, setDisconnectLabel] = useState<string | null>(null);

  const [verifyLink, setVerifyLink] = useState<string>("");

  const uploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await authApi.post(`/influencer/set-avatar/${influencer.id}`, formData);
      onUpdateAvatar();
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectModalHandler = async () => {
    try {
      switch (disconnectLabel) {
        case "Youtube":
          // console.log("from disconnect youtube handler");
          await tryDisconnectYoutube(influencer.id);
          break;
        case "Instagram":
          // console.log("from disconnect youtube handler");
          await tryDisconnectInstagram(influencer.id);
          break;
        case "Tiktok":
          // console.log("from disconnect tiktok handler");
          await tryDisconnectTiktok(influencer.id);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setDisconnectLabel(null);
      closeDisconnect();
    }
  };

  const youtubeBtnClick = async () => {
    if (influencer.isYoutubeConnected) {
      setDisconnectLabel("Youtube");
      openDisconnect();
    } else {
      const response = await tryConnectToYoutube(influencer.id);
      if (response != undefined) {
        setVerifyLink(response);
        open();
      }
    }
  };

  const instagramBtnClick = async () => {
    if (influencer.isInstagramConnected) {
      setDisconnectLabel("Instagram");
      openDisconnect();
    } else {
      const response = await tryConnectToInstagram(influencer.id);
      if (response != undefined) {
        setVerifyLink(response);
        open();
      }
    }
  };

  const tikTokBtnClick = async () => {
    if (influencer.isTikTokConnected) {
      setDisconnectLabel("Tiktok");
      openDisconnect();
    } else {
      const response = await tryConnectToTikTok(influencer.id);
      if (response != undefined) {
        setVerifyLink(response);
        open();
      }
    }
  };
  const changePage =()=>{
    if(page==="profile"){
      updatePage("strategy")
    }else{
      updatePage("profile")
    }
  }
  return (
    <div className="bg-white w-3/12 rounded-2xl pt-14 px-7 pb-8 mr-8 shadow-2xl h-fit">
      <div className="relative w-8/12 h-0 pt-[66.6%] mx-auto rounded-full bg-slate-200 text-gray text-center mb-4 overflow-hidden">
        {influencer.avatar != null && (
          <img
            className="absolute left-0 top-0 w-full h-full object-cover"
            src={`${IMAGES_URL}/avatars/${influencer.avatar}`}
            alt=""
          />
        )}
        <div
          className={clsx(
            "absolute left-0 top-0 w-full h-full text-sm transition-all",
            influencer.avatar != null && "opacity-0 hover:opacity-80 bg-white"
          )}
        >
          <form className="w-full h-full">
            <label className="w-full h-full flex items-center justify-center cursor-pointer">
              Upload picture
              <input
                className="hidden"
                type="file"
                accept=".png,.jpg"
                onChange={uploadAvatar}
              />
            </label>
          </form>
        </div>
      </div>
      <div className="text-3xl text-center mb-8 overflow-hidden text-ellipsis">{`${influencer.firstname} ${influencer.lastname}`}</div>
      <div className="flex flex-col items-center">
        <Button
          className="w-full mb-3 max-w-[15rem]"
          color={influencer.isTikTokConnected ? "red" : "orange"}
          radius="lg"
          onClick={() => tikTokBtnClick()}
        >
          {influencer.isTikTokConnected ? "Disconnect TikTok" : "Connect TikTok"}
        </Button>
        <Button
          className="w-full mb-3 max-w-[15rem]"
          color={influencer.isInstagramConnected ? "red" : "orange"}
          radius="lg"
          onClick={() => instagramBtnClick()}
        >
          {influencer.isInstagramConnected
            ? "Disconnect Instagram"
            : "Connect to Instagram"}
        </Button>

        <Button
          className="w-full mb-6 max-w-[15rem]"
          color={influencer.isYoutubeConnected ? "red" : "orange"}
          radius="lg"
          onClick={() => youtubeBtnClick()}
        >
          {influencer.isYoutubeConnected ? "Disconnect Youtube" : "Connect to YouTube"}
        </Button>

        <Button
          className="w-full max-w-[15rem]"
          component={Link}
          to={`/app/influencer/insights/${influencer.id}/youtube`}
          color="dark"
          radius="xl"
          size="md"
        >
          View Insights
        </Button>
        <Button
          className="w-full max-w-[15rem] mt-3"
          
          onClick={changePage}
          color="dark"
          radius="xl"
          size="md"
        >
          View {page}
        </Button>
      </div>
      <Modal opened={opened} onClose={close} centered>
        <div>
          <div className="text-center text-2xl">Send this link to influencer</div>
          <div className="flex items-center mt-10 border border-solid border-gray-300 rounded-sm">
            <div className="overflow-hidden whitespace-nowrap pl-2 font-medium mr-2">
              {verifyLink}
            </div>
            <CopyToClipboardElem text={verifyLink} />
          </div>
        </div>
      </Modal>
      <Modal opened={openedDisconnect} onClose={closeDisconnect} centered>
        <div>
          <div className="text-center text-2xl mb-6">
            Do you really want to disconnect {disconnectLabel}?
          </div>
          <div className="flex space-x-8">
            <Button
              className="w-full mb-3 max-w-[15rem]"
              color="red"
              radius="lg"
              onClick={disconnectModalHandler}
            >
              Yes
            </Button>
            <Button
              className="w-full mb-3 max-w-[15rem]"
              color="gray"
              radius="lg"
              onClick={closeDisconnect}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
