import { useLocation } from "react-router-dom";
import useInsightsStore from "@shared/lib/stores/insights-store.hook";
import { removeSlash } from "@shared/lib/utils";
import { useEffect, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { dateInputParser } from "@shared/lib/utils/date-input-parser";

export const InfluencerSinglePostHead = () => {
  const store = useInsightsStore();
  const location = useLocation();

  const [inputPostId, setInputPostId] = useState("");
  const [platformType, setPlatformType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  const checkPlatformType = () => {
    const platformType = location.pathname.split(`single/`)[1];
    platformType && setPlatformType(removeSlash(platformType));
  };

  useEffect(() => {
    checkPlatformType();
  }, [location]);

  useEffect(() => {
    return () => {
      setInputPostId("");
      store.setSinglePostID("");
    };
  }, []);

  const setCustomDate = (type: "startDate" | "endDate", date: Date | null) => {
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
      <div className="flex space-x-3 text-3xl text-black">
        {platformType === "instagram"
          ? "Insights for one Instagram post (All time)"
          : platformType === "youtube"
          ? "Insights for one Youtube video"
          : "Insights for one TikTok post (All time)"}
      </div>
      {platformType !== "instagram" && (
        <div className="mt-3 flex gap-3 items-center">
          <DateInput
            value={startDate ? new Date(startDate) : undefined}
            valueFormat="DD/MM/YYYY"
            dateParser={dateInputParser}
            size="md"
            radius="lg"
            className="shadow-2xl"
            onChange={(dateValue) => setCustomDate("startDate", dateValue)}
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
            onChange={(dateValue) => setCustomDate("endDate", dateValue)}
          />
          <Button
            size="md"
            radius="lg"
            color="dark"
            onClick={() => store.setFetchingDates({ from: startDate, to: endDate })}
          >
            Show Post Insights
          </Button>
        </div>
      )}
      {platformType === "instagram" && (
        <div className="flex text-lg mt-8 max-w-lg">
          <TextInput
            size="md"
            radius="lg"
            placeholder="Enter the ID of Instagram post"
            value={inputPostId}
            onChange={(event) => setInputPostId(event.currentTarget.value)}
            className="grow mr-4"
          />
          <Button
            size="md"
            radius="lg"
            color="dark"
            onClick={() => store.setSinglePostID(inputPostId)}
          >
            Show Post Insights
          </Button>
        </div>
      )}
    </div>
  );
};
