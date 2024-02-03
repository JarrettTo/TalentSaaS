import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useInsightsStore, {
  StatisticsTypesEnum,
} from "@shared/lib/stores/insights-store.hook";
import { useEffect, useState } from "react";
import { IInfluencer } from "@widgets/influencer";
import { Button, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { dateInputParser } from "@shared/lib/utils/date-input-parser";

type InfluencerInsightsHeadProps = {
  influencer: IInfluencer;
  shareToken?: string | null;
};

const NavLinkClass =
  "text-black w-fit underline-offset-8 hover:text-orange transition-all cursor-pointer";
const activeDateClass = "underline decoration-orange";

export const ShareInsightsHead = (props: InfluencerInsightsHeadProps) => {
  const { influencer, shareToken } = props;

  const store = useInsightsStore();

  const [monthActive, setMonthActive] = useState<boolean>(true);
  const [customDatesActive, setCustomDatesActive] = useState<boolean>(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  useEffect(() => {
    handle30DaysIntervalClick();
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

  return (
    <div>
      <div>
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
        {customDatesActive && (
          <div className="mt-3 flex gap-3 items-center">
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
              color="dark"
              radius="lg"
              size="md"
              onClick={() => store.setFetchingDates({ from: startDate, to: endDate })}
            >
              Show Statistics
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end">
        <div className="flex space-x-3 text-lg text-black mt-8">
          <NavLink
            to={`/share/influencer/${influencer.id}&token=${shareToken}/tiktok`}
            className={clsx(NavLinkClass, "no-underline")}
          >
            TikTok Analytics
          </NavLink>
          <span>|</span>
          <NavLink
            className={clsx(NavLinkClass, "no-underline")}
            to={`/share/influencer/${influencer.id}&token=${shareToken}/instagram`}
          >
            Instagram Analytics
          </NavLink>
          <span>|</span>
          <NavLink
            className={clsx(NavLinkClass, "no-underline")}
            to={`/share/influencer/${influencer.id}&token=${shareToken}/youtube`}
          >
            Youtube Analytics
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
    </div>
  );
};
