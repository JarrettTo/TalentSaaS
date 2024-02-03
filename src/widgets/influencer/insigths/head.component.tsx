import { NavLink, useLocation, Link } from "react-router-dom";
import { IInfluencer } from "../types";
import clsx from "clsx";
import useInsightsStore, {
  StatisticsTypesEnum,
} from "@shared/lib/stores/insights-store.hook";
import { useEffect, useState } from "react";
import { tryShareAccount } from "@features/profile/api";

import { removeSlash } from "@shared/lib/utils";
import { DateInput } from "@mantine/dates";
import { Button, Modal, Select } from "@mantine/core";
import {
  useRefreshTikTokLocalStatisticsMutation,
  useTikTokLocalStatisticsLogsByInfluencerIdQuery,
} from "@entities/tik-tok-statistics";
import {
  useRefreshYoutubeLocalStatisticsMutation,
  useYoutubeLocalStatisticsLogsByInfluencerIdQuery,
} from "@entities/youtube-statistics";
import { toast } from "react-toastify";
import { dateInputParser } from "@shared/lib/utils/date-input-parser";
import { useDisclosure } from "@mantine/hooks";
import CopyToClipboardElem from "@shared/ui/copy-clipboard.component";

type InfluencerInsightsHeadProps = {
  influencer: IInfluencer;
};

const NavLinkClass =
  "text-black w-fit underline-offset-8 hover:text-orange transition-all";
const activeDateClass = "underline decoration-orange";

export const InfluencerInsightsHead = (props: InfluencerInsightsHeadProps) => {
  const { influencer } = props;
  const [platformType, setPlatformType] = useState<string>("youtube");
  const store = useInsightsStore();
  const [shareLink, setShareLink] = useState<string>("");
  const location = useLocation();
  const { data: tikTokLocalStatisticsLogs } =
    useTikTokLocalStatisticsLogsByInfluencerIdQuery(influencer.id);
  const { data: youtubeLocalStatisticsLogs } =
    useYoutubeLocalStatisticsLogsByInfluencerIdQuery(influencer.id);
  const { mutateAsync: refreshYoutubeLocalStatistics } =
    useRefreshYoutubeLocalStatisticsMutation();
  const { mutateAsync: refreshTikTokLocalStatistics } =
    useRefreshTikTokLocalStatisticsMutation();

  const [monthActive, setMonthActive] = useState<boolean>(true);
  const [customDatesActive, setCustomDatesActive] = useState<boolean>(false);
  const [startDate, setStartDate] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [endDate, setEndDate] = useState("");

  let lastStatisticsRefreshDate = "";
  if (location.pathname.includes("youtube")) {
    lastStatisticsRefreshDate = youtubeLocalStatisticsLogs?.[0]?.createdAt || "";
  }
  if (location.pathname.includes("tiktok")) {
    lastStatisticsRefreshDate = tikTokLocalStatisticsLogs?.[0]?.createdAt || "";
  }

  const handle30DaysIntervalClick = () => {
    const toDate = new Date();
    const minutes = toDate.getMinutes();
    const timezoneOffset = toDate.getTimezoneOffset();
    toDate.setMinutes(minutes - timezoneOffset);
    const month = toDate.getMonth();
    const fromDate = new Date();
    fromDate.setMinutes(minutes - timezoneOffset);
    fromDate.setMonth(month - 1);
    const toDateString = toDate.toISOString().split("T")[0];
    const fromDateString = fromDate.toISOString().split("T")[0];
    if (!toDateString || !fromDateString) {
      return;
    }
    store.setFetchingDates({ from: fromDateString, to: toDateString });
    setCustomDatesActive(false);
    setMonthActive(true);
  };
  const checkPlatformType = () => {
    const platformType = location.pathname.split(`insights/${influencer.id}/`)[1];
    platformType && setPlatformType(removeSlash(platformType));
  };

  useEffect(() => {
    handle30DaysIntervalClick();
    checkPlatformType();
  }, []);

  const handleCustomDatesIntervalClick = () => {
    setMonthActive(false);
    setCustomDatesActive(true);
  };

  const handleCustomDateUpdate = (type: "startDate" | "endDate", date: Date | null) => {
    if (!date) {
      return;
    }
    const minutes = date.getMinutes();
    const timezoneOffset = date.getTimezoneOffset();
    date.setMinutes(minutes - timezoneOffset);
    const dateString = date.toISOString().split("T")[0];
    if (!dateString) {
      return;
    }
    if (type === "startDate") {
      setStartDate(dateString);
      return;
    }
    setEndDate(dateString);
  };

  const getMinEndDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth();
    date.setMonth(month + 1);
    return date;
  };
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
  const handleStatisticsRefresh = async () => {
    try {
      if (location.pathname.includes("youtube")) {
        await refreshYoutubeLocalStatistics(influencer.id);
      }
      if (location.pathname.includes("tiktok")) {
        await refreshTikTokLocalStatistics(influencer.id);
      }
      toast.success("Statistics successfully refreshed");
    } catch (error: any) {
      console.error("refresh tik tok local statistics error:", error);
      toast.error(
        "Looks like some error occurs during refresh. Please, try again later."
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Button color="dark" radius="lg" size="lg" onClick={handleStatisticsRefresh}>
            <div className="flex gap-2 items-center">
              <p>Refresh</p>
              <svg
                className="w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </Button>
          {lastStatisticsRefreshDate && (
            <p className="opacity-60">
              Last refreshed at {new Date(lastStatisticsRefreshDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex space-x-3 text-lg text-black">
          <div
            className={clsx(
              NavLinkClass,
              "cursor-pointer",
              monthActive && activeDateClass
            )}
            onClick={handle30DaysIntervalClick}
          >
            Last 30 days
          </div>
          <span>|</span>
          <div
            className={clsx(
              NavLinkClass,
              "cursor-pointer",
              customDatesActive && activeDateClass
            )}
            onClick={handleCustomDatesIntervalClick}
          >
            Custom dates
          </div>
        </div>
      </div>
      {customDatesActive && (
        <div className="mt-3 flex gap-3 justify-end items-center">
          <DateInput
            value={startDate ? new Date(startDate) : undefined}
            valueFormat="DD/MM/YYYY"
            dateParser={dateInputParser}
            size="md"
            radius="lg"
            className="shadow-2xl"
            onChange={(dateValue) => handleCustomDateUpdate("startDate", dateValue)}
          />
          <p>to</p>
          <DateInput
            value={endDate ? new Date(endDate) : undefined}
            valueFormat="DD/MM/YYYY"
            dateParser={dateInputParser}
            minDate={getMinEndDate(startDate)}
            size="md"
            radius="lg"
            className="shadow-2xl"
            onChange={(dateValue) => handleCustomDateUpdate("endDate", dateValue)}
          />
          <Button
            size="md"
            radius="lg"
            color="dark"
            onClick={() => store.setFetchingDates({ from: startDate, to: endDate })}
          >
            Show Statistics
          </Button>
        </div>
      )}
      <div className="flex justify-between mt-8 align-center">
        <div className="flex items-end align-center justify-center items-center">
          <div className="flex space-x-3 text-lg text-black align-center items-center mr-5 justify-center">
            <Button
              className="w-full max-w-[15rem]"
              component={Link}
              to={`/app/influencer/profile/${influencer.id}`}
              color="dark"
              radius="xl"
              size="md"
            >
              View Profile
            </Button>
            
            <NavLink
              to={`/app/influencer/insights/${influencer.id}/tiktok`}
              className={clsx(NavLinkClass, "no-underline")}
            >
              TikTok
            </NavLink>
            <span>|</span>
            <NavLink
              className={clsx(NavLinkClass, "no-underline align-center")}
              to={`/app/influencer/insights/${influencer.id}/instagram`}
            >
              Instagram
            </NavLink>
            <span>|</span>
            <NavLink
              className={clsx(NavLinkClass, "no-underline align-center")}
              to={`/app/influencer/insights/${influencer.id}/youtube`}
            >
              YouTube
            </NavLink>
          </div>
          <div>
            <Select
              defaultValue="Average"
              radius={8}
              data={["Average", "Median"]}
              className="shadow-2xl"
              onChange={(value) => store.setStatisticsType(value as StatisticsTypesEnum)}
            />
          </div>
        </div>
        <div className="flex flex-row align-center justify-center items-center">
          <Link
            className="block w-fit underline-offset-4 text-black hover:opacity-70 mx-auto whitespace-nowrap mr-5"
            to={`/app/influencer/insights/${influencer.id}/single/${platformType}`}
          >
            Post insights
          </Link>
          <Button
            className="w-full max-w-[15rem]"
            color="orange"
            radius="xl"
            size="md"
            onClick={onShareHandler}
          >
            Share Insights
          </Button>
        </div>
      </div>
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
