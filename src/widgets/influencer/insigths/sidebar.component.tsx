import { IMAGES_URL } from "@shared/constants/variables";
import { IInfluencer } from "../types";
import { Button, Modal } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import CopyToClipboardElem from "@shared/ui/copy-clipboard.component";
import { useDisclosure } from "@mantine/hooks";
import { tryShareAccount } from "@features/profile/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { removeSlash } from "@shared/lib/utils";

type InfluencerInsightsSidebarProps = {
  influencer: IInfluencer;
};

export const InfluencerInsightsSidebar = (props: InfluencerInsightsSidebarProps) => {
  const { influencer } = props;

  const [opened, { open, close }] = useDisclosure(false);
  const location = useLocation();

  const [shareLink, setShareLink] = useState<string>("");
  const [platformType, setPlatformType] = useState<string>("youtube");

  const onShareHandler = async () => {
    try {
      const response = await tryShareAccount(influencer.id);
      setShareLink(
        `${window.location.origin}/share/influencer/${influencer.id}&token=${response}/${platformType}`
      );
      open();
    } catch {
      toast.error("Error on share link");
    }
  };

  const checkPlatformType = () => {
    const platformType = location.pathname.split(`insights/${influencer.id}/`)[1];
    platformType && setPlatformType(removeSlash(platformType));
  };

  useEffect(() => {
    checkPlatformType();
  }, [location]);

  return (
    <div className="bg-white w-3/12 rounded-2xl py-8 px-7 shadow-2xl h-fit">
      <div className="relative w-8/12 h-0 pt-[66.6%] mx-auto rounded-full bg-slate-200 text-gray text-center mb-4 overflow-hidden">
        {influencer.avatar != null && (
          <img
            className="absolute left-0 top-0 w-full h-full object-cover"
            src={`${IMAGES_URL}/avatars/${influencer.avatar}`}
            alt=""
          />
        )}
      </div>
      <div className="text-3xl text-center mb-8 overflow-hidden text-ellipsis">{`${influencer.firstname} ${influencer.lastname}`}</div>
      
      
      <Modal opened={opened} onClose={close} centered>
        <div>
          <div className="text-center text-2xl">
            Send this link to share talent statistic
          </div>
          <div className="mt-3 text-center text-gray-600">
            The link is valid for 24 hours
          </div>
          <div className="flex items-center mt-10 border border-solid rounded-sm">
            <div className="overflow-hidden whitespace-nowrap pl-2 font-medium mr-2">
              {shareLink}
            </div>
            <CopyToClipboardElem text={shareLink} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
