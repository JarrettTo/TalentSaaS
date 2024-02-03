import { IInfluencer } from "../types";
import { useEffect, useState } from "react";
import { Button, Loader } from "@mantine/core";
import {
  ITikTokPostsStatistics,
  ITikTokPostsStatisticsItem,
  getTikTokPostsStatisticsByInfluencerId,
} from "@entities/tik-tok-statistics";
import useInsightsStore from "@shared/lib/stores/insights-store.hook";
import clsx from "clsx";
import { toast } from "react-toastify";
import { kFormatter } from "@shared/lib/utils";

type InfluencerTikTokSingleGridProps = {
  influencer: IInfluencer;
};

const tableCellClasses = "flex justify-center items-center p-3";

const tableHeaders = ["Title", "Views", "Comments", "Likes", ""];

export const InfluencerTikTokSingleGrid = (props: InfluencerTikTokSingleGridProps) => {
  const { influencer } = props;

  const selectedDates = useInsightsStore((store) => store.dates);

  const [tikTokPostsStatistics, setTikTokPostsStatistics] =
    useState<ITikTokPostsStatistics | null>(null);
  const [isTikTokPostsStatisticsLoading, setIsTikTokPostsStatisticsLoading] =
    useState(true);
  const [isTikTokPostsStatisticsError, setIsTikTokPostsStatisticsError] = useState(false);

  useEffect(() => {
    setIsTikTokPostsStatisticsLoading(true);
    setIsTikTokPostsStatisticsError(false);
    const getYouTubePostsStatistics = async () => {
      try {
        const postsStatistics = await getTikTokPostsStatisticsByInfluencerId({
          influencerId: influencer.id,
          from: selectedDates.from.split("T")[0] || "",
          to: selectedDates.to.split("T")[0] || "",
        });
        setTikTokPostsStatistics(postsStatistics);
      } catch (error: any) {
        console.error("get tikTok posts statistics error:", error);
        setIsTikTokPostsStatisticsError(true);
      } finally {
        setIsTikTokPostsStatisticsLoading(false);
      }
    };
    getYouTubePostsStatistics();
  }, [influencer, selectedDates]);

  const handleCopyVideoLink = (videoStatistics: ITikTokPostsStatisticsItem) => {
    if (!tikTokPostsStatistics?.username) {
      toast.error("Unable to get TikTok username");
      return;
    }
    navigator.clipboard
      .writeText(
        `https://www.tiktok.com/@${tikTokPostsStatistics.username}/video/${videoStatistics.tiktokId}`
      )
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Unable to copy TikTok video link"));
  };

  if (isTikTokPostsStatisticsLoading) {
    return (
      <div className="w-9/12 pl-8 flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isTikTokPostsStatisticsError || !tikTokPostsStatistics) {
    return (
      <div className="h-80 w-9/12 pl-8 flex items-center justify-center text-xl text-center">
        <p>
          Looks like some problem with videos occurs
          <br />
          Please, try again later
        </p>
      </div>
    );
  }

  if (tikTokPostsStatistics.videos.length === 0) {
    return (
      <div className="h-80 w-9/12 pl-8 flex items-center justify-center text-xl text-center">
        <p>There are no videos</p>
      </div>
    );
  }

  return (
    <div className="w-9/12 pl-8">
      <div className="grid grid-cols-[1fr,repeat(3,minmax(0,0.5fr)),1fr]">
        {tableHeaders.map((tableHeader) => (
          <div
            className={clsx(
              tableCellClasses,
              "bg-slate-100 first:rounded-tl-2xl last:rounded-tr-2xl"
            )}
          >
            <p className="text-lg">{tableHeader}</p>
          </div>
        ))}
      </div>
      {tikTokPostsStatistics.videos.map((videoStatistics) => (
        <div className="grid grid-cols-[1fr,repeat(3,minmax(0,0.5fr)),1fr] odd:bg-white even:bg-purple last:rounded-b-2xl">
          <div className={clsx(tableCellClasses, "overflow-hidden")}>
            <p className="grow truncate">{videoStatistics.title}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{kFormatter(videoStatistics.views)}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{kFormatter(videoStatistics.comments)}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{kFormatter(videoStatistics.likes)}</p>
          </div>
          <div className={tableCellClasses}>
            <Button
              color="dark"
              radius="lg"
              onClick={() => handleCopyVideoLink(videoStatistics)}
            >
              Copy video link
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
