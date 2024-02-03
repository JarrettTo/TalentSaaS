import { IInfluencer } from "../types";
import { useEffect, useState } from "react";
import { formatCountriesStatistics } from "@shared/lib/utils";
import { Button, Loader, Modal } from "@mantine/core";
import useInsightsStore, {
  StatisticsTypesEnum,
} from "@shared/lib/stores/insights-store.hook";
import {
  useTikTokLocalStatisticsByInfluencerIdQuery,
  useTikTokLocalStatisticsLogsByInfluencerIdQuery,
  useTikTokPostsStatisticsByInfluencerIdQuery,
} from "@entities/tik-tok-statistics";
import { calculateAverageValue } from "@shared/lib/utils/calculate-average-value";
import { calculateMedianValue } from "@shared/lib/utils/calculate-median-value";
import { StatisticsItem } from "@shared/ui/statistics-item.component";
import CopyToClipboardElem from "@shared/ui/copy-clipboard.component";
import { useDisclosure } from "@mantine/hooks";
import { DiagramColors, TIK_TOK_BUSINESS_AUTH_LINK } from "@shared/lib/constants";
import { DoughnutDiagram, BarDiagram, BarPercentage } from "@shared/ui";
import DiagramWrapper from "@shared/ui/diagrams/diagram-wrapper";
import InfluencerDiagramLegendElem from "./diagram-legend.component";
import PercentageWrapper from "@shared/ui/diagrams/percentage-wrapper";

type InfluencerInsightsGridProps = {
  influencer: IInfluencer;
  shareToken?: string | null;
};

export const InfluencerInsightsGridTikTok = (props: InfluencerInsightsGridProps) => {
  const { influencer } = props;

  const store = useInsightsStore();
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: localStatistics,
    isLoading: isLocalStatisticsLoading,
    isError: isLocalStatisticsError,
  } = useTikTokLocalStatisticsByInfluencerIdQuery(influencer.id);
  const { data: localStatisticsLogs, isLoading: isLocalStatisticsLogsLoading } =
    useTikTokLocalStatisticsLogsByInfluencerIdQuery(influencer.id);
  const {
    data: postsStatistics,
    isLoading: isPostsStatisticsLoading,
    isError: isPostsStatisticsError,
  } = useTikTokPostsStatisticsByInfluencerIdQuery({
    influencerId: influencer.id,
    from: store.dates.from,
    to: store.dates.to,
  });

  const [countriesStatistics, setCountriesStatistics] = useState<
    { name: string; count: string }[]
  >([]);
  const [dynamicStatistics, setDynamicStatistics] = useState({
    averageComments: 0,
    averageLikes: 0,
    averageViews: 0,
    medianComments: 0,
    medianLikes: 0,
    medianViews: 0,
  });

  useEffect(() => {
    if (
      !localStatistics ||
      !localStatistics.countries ||
      localStatistics.countries.length === 0
    ) {
      return;
    }
    const formattedCountriesStatistics = formatCountriesStatistics(
      localStatistics.countries
    );
    setCountriesStatistics(formattedCountriesStatistics);
  }, [localStatistics]);

  useEffect(() => {
    if (!postsStatistics) {
      return;
    }
    const { videos } = postsStatistics;
    const commentsArray: number[] = [];
    const likesArray: number[] = [];
    const viewsArray: number[] = [];
    videos.forEach((video) => {
      commentsArray.push(video.comments);
      likesArray.push(video.likes);
      viewsArray.push(video.views);
    });
    setDynamicStatistics({
      averageComments: calculateAverageValue(commentsArray),
      averageLikes: calculateAverageValue(likesArray),
      averageViews: calculateAverageValue(viewsArray),
      medianComments: calculateMedianValue(commentsArray),
      medianLikes: calculateMedianValue(likesArray),
      medianViews: calculateMedianValue(viewsArray),
    });
  }, [postsStatistics]);

  const isTikTokBusinessConnected =
    localStatistics && !Object.values(localStatistics).some((value) => value === null);

  if (isLocalStatisticsLoading || isLocalStatisticsLogsLoading) {
    return (
      <div className="flex items-center justify-center w-9/12 pl-8 text-xl text-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (!localStatistics || isLocalStatisticsError) {
    return (
      <div className="flex items-center justify-center w-9/12 pl-8 text-xl text-center">
        <p>You have not connected the TikTok account of this influencer</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-9/12 pl-8">
        <h2 className="mb-2 text-xl">All time statistics</h2>
        <div className="mb-3 grid grid-cols-4 gap-3">
          <StatisticsItem
            label="Followers"
            value={localStatistics.followersCount}
            previousValue={localStatisticsLogs?.[0]?.followersCount}
          />
          <StatisticsItem
            label="Average Views"
            value={Number(localStatistics.viewsAverage)}
            previousValue={localStatisticsLogs?.[0]?.viewsAverage}
            tooltipText="Average amount of views across all posts"
          />
          <StatisticsItem
            label="Likes"
            value={Number(localStatistics.likesCount)}
            previousValue={localStatisticsLogs?.[0]?.likesCount}
          />
          <StatisticsItem
            label="Videos"
            value={Number(localStatistics.videosCount)}
            previousValue={localStatisticsLogs?.[0]?.videosCount}
          />
        </div>
        <h2 className="mb-2 text-xl">
          {store.statisticsType === StatisticsTypesEnum.Average ? "Average" : "Median"}{" "}
          statistics
        </h2>
        <div className="mb-3 grid grid-cols-3 gap-3">
          {!postsStatistics || isPostsStatisticsError ? (
            <div className="col-start-1 col-end-4 h-24 flex justify-center items-center bg-white p-2 rounded-xl shadow-2xl">
              {isPostsStatisticsLoading ? (
                <div className="flex items-center gap-2">
                  <p>Loading</p>
                  <Loader color="orange" size="xs" />
                </div>
              ) : (
                <p>Looks like some error with videos occurs</p>
              )}
            </div>
          ) : (
            <>
              <StatisticsItem
                label={
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? "Average Comments"
                    : "Median Comments"
                }
                value={
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? dynamicStatistics.averageComments
                    : dynamicStatistics.medianComments
                }
                tooltipText={`${
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? "Average"
                    : "Median"
                } amount of comments per chosen dates`}
              />
              <StatisticsItem
                label={
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? "Average Likes"
                    : "Median Likes"
                }
                value={
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? dynamicStatistics.averageLikes
                    : dynamicStatistics.medianLikes
                }
                tooltipText={`${
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? "Average"
                    : "Median"
                } amount of likes per chosen dates`}
              />
              <StatisticsItem
                label={
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? "Average Views"
                    : "Median Views"
                }
                value={
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? dynamicStatistics.averageViews
                    : dynamicStatistics.medianViews
                }
                tooltipText={`${
                  store.statisticsType === StatisticsTypesEnum.Average
                    ? "Average"
                    : "Median"
                } amount of views per chosen dates`}
              />
            </>
          )}
        </div>
        <h2 className="mb-2 text-xl">All time diagrams</h2>
        {isTikTokBusinessConnected ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded-xl shadow-2xl">
              <div className="text-xl mb-4">Gender, %</div>
              {localStatistics.genders?.male || localStatistics.genders?.female ? (
                <>
                  <DiagramWrapper className="mb-4">
                    <DoughnutDiagram
                      data={{
                        labels: ["Male", "Female"],
                        datasets: [
                          {
                            label: " ",
                            data: [
                              Number((localStatistics.genders.male * 100).toFixed(2)),
                              Number((localStatistics.genders.female * 100).toFixed(2)),
                            ],
                            backgroundColor: ["#f77333", "#7690ed"],
                          },
                        ],
                      }}
                    />
                  </DiagramWrapper>
                  <div className="space-y-3 ml-4">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-blue mr-4"></span>
                      <span>
                        Male ({Number((localStatistics.genders.male * 100).toFixed(2))})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-orange mr-4"></span>
                      <span>
                        Female (
                        {Number((localStatistics.genders.female * 100).toFixed(2))})
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-end text-lg min-h-[14rem]">
                  Not enough data about gender
                </div>
              )}
            </div>
            <div className="p-4 bg-white rounded-xl flex flex-col justify-between shadow-2xl">
              <div className="text-xl mb-4">Age, %</div>
              {localStatistics.ages?.length ? (
                <BarDiagram
                  data={{
                    labels: localStatistics.ages.map((age) => age.name),
                    datasets: [
                      {
                        label: "Users",
                        data: localStatistics.ages.map((age) =>
                          Number((Number(age.count) * 100).toFixed(2))
                        ),
                        backgroundColor: "#7690ed",
                      },
                    ],
                  }}
                />
              ) : (
                <div className="text-lg">Not enough data about age</div>
              )}
            </div>
            <div className="p-4 bg-white rounded-xl shadow-2xl flex flex-col">
              <div className="text-xl mb-4">Country, %</div>
              {countriesStatistics.length > 0 ? (
                <>
                  <PercentageWrapper>
                    <BarPercentage
                      data={{
                        labels: countriesStatistics.map((country) => country.name),
                        datasets: [
                          {
                            label: " ",
                            data: countriesStatistics.map((country) => Number(country.count)),
                            backgroundColor: DiagramColors,
                          },
                        ],
                      }}
                    />
                  </PercentageWrapper>
                </>
              ) : (
                <div className="text-lg flex items-end min-h-[24rem]">
                  Not enough data about countries
                </div>
              )}
            </div>
            <div className="p-4 bg-white rounded-xl shadow-2xl flex flex-col">
              <div className="text-xl mb-4">Devices</div>
              {localStatistics.devices &&
              Number(localStatistics.devices.DESKTOP) > 0 &&
              Number(localStatistics.devices.MOBILE) > 0 &&
              Number(localStatistics.devices.TV) > 0 ? (
                <>
                  <DiagramWrapper>
                    <DoughnutDiagram
                      data={{
                        labels: Object.keys(localStatistics.devices),
                        datasets: [
                          {
                            label: " ",
                            data: Object.values(localStatistics.devices).map(
                              (deviceCount) => Number(deviceCount)
                            ),
                            backgroundColor: DiagramColors,
                          },
                        ],
                      }}
                    />
                  </DiagramWrapper>
                  <div className="space-y-3 mt-auto">
                    {Object.keys(localStatistics.devices).map((deviceTitle, index) => (
                      <InfluencerDiagramLegendElem
                        key={deviceTitle}
                        label={deviceTitle}
                        color={DiagramColors[index]}
                        value={(localStatistics as any).devices[deviceTitle] || 0}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-lg flex items-end min-h-[24rem]">
                  Not enough data about devices
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-40 flex flex-col justify-center items-center gap-2 rounded-2xl shadow-2xl bg-white">
            <p className="text-xl">
              To view additional statistics, please, connect TikTok Business
            </p>
            <Button color="dark" radius="lg" size="sm" onClick={open}>
              Connect
            </Button>
          </div>
        )}
      </div>

      <Modal opened={opened} onClose={close} centered>
        <div>
          <div className="text-center text-2xl">Send this link to influencer</div>
          <div className="flex items-center mt-10 border border-solid border-gray-300 rounded-sm">
            <div className="overflow-hidden whitespace-nowrap pl-2 font-medium mr-2">
              {TIK_TOK_BUSINESS_AUTH_LINK}
            </div>
            <CopyToClipboardElem text={TIK_TOK_BUSINESS_AUTH_LINK} />
          </div>
        </div>
      </Modal>
    </>
  );
};
