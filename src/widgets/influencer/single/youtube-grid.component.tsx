import { IInfluencer } from "../types";
import { useEffect, useState } from "react";
import { Button, Loader } from "@mantine/core";
import {
  IYoutubePostsStatistics,
  IYoutubePostsStatisticsItem,
  getYoutubePostsStatisticsByInfluencerId,
} from "@entities/youtube-statistics";
import useInsightsStore from "@shared/lib/stores/insights-store.hook";
import clsx from "clsx";
import { toast } from "react-toastify";

type InfluencerYoutubeSingleGridProps = {
  influencer: IInfluencer;
};

const tableCellClasses = "flex justify-center items-center p-3";

const tableHeaders = ["Title", "Views", "Comments", "Likes", "Dislikes", ""];

export const InfluencerYoutubeSingleGrid = (props: InfluencerYoutubeSingleGridProps) => {
  const { influencer } = props;

  const selectedDates = useInsightsStore((store) => store.dates);

  const [youtubePostsStatistics, setYoutubePostsStatistics] =
    useState<IYoutubePostsStatistics | null>(null);
  const [isYoutubePostsStatisticsLoading, setIsYoutubePostsStatisticsLoading] =
    useState(true);
  const [isYoutubePostsStatisticsError, setIsYoutubePostsStatisticsError] =
    useState(false);

  useEffect(() => {
    setIsYoutubePostsStatisticsLoading(true);
    setIsYoutubePostsStatisticsError(false);
    const getYouTubePostsStatistics = async () => {
      try {
        const postsStatistics = await getYoutubePostsStatisticsByInfluencerId({
          influencerId: influencer.id,
          from: selectedDates.from.split("T")[0] || "",
          to: selectedDates.to.split("T")[0] || "",
        });
        setYoutubePostsStatistics(postsStatistics);
      } catch (error: any) {
        console.error("get youtube posts statistics error:", error);
        setIsYoutubePostsStatisticsError(true);
      } finally {
        setIsYoutubePostsStatisticsLoading(false);
      }
    };
    getYouTubePostsStatistics();
  }, [influencer, selectedDates]);

  const handleCopyVideoLink = (videoStatistics: IYoutubePostsStatisticsItem) => {
    navigator.clipboard
      .writeText(`https://youtube.com/watch?v=${videoStatistics.id}`)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Unable to copy Youtube video link"));
  };

  if (isYoutubePostsStatisticsLoading) {
    return (
      <div className="w-9/12 pl-8 flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isYoutubePostsStatisticsError || !youtubePostsStatistics) {
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

  if (youtubePostsStatistics.videos.length === 0) {
    return (
      <div className="h-80 w-9/12 pl-8 flex items-center justify-center text-xl text-center">
        <p>There are no videos</p>
      </div>
    );
  }

  return (
    <div className="w-9/12 pl-8">
      <div className="grid grid-cols-[1fr,repeat(4,minmax(0,0.5fr)),1fr]">
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
      {youtubePostsStatistics.videos.map((videoStatistics) => (
        <div className="grid grid-cols-[1fr,repeat(4,minmax(0,0.5fr)),1fr] odd:bg-white even:bg-purple last:rounded-b-2xl">
          <div className={clsx(tableCellClasses, "overflow-hidden")}>
            <p className="grow truncate">{videoStatistics.title}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{videoStatistics.views}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{videoStatistics.comments}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{videoStatistics.likes}</p>
          </div>
          <div className={tableCellClasses}>
            <p>{videoStatistics.dislikes}</p>
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
