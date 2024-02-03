import {
  useYoutubePostsStatisticsByInfluencerIdWithVerificationCodeQuery,
  useYoutubeStatisticsByInfluencerIdWithVerificationCodeQuery,
} from "@entities/youtube-statistics";
import { Loader } from "@mantine/core";
import { DiagramColors } from "@shared/lib/constants";
import useInsightsStore, {
  StatisticsTypesEnum,
} from "@shared/lib/stores/insights-store.hook";
import { formatCountriesStatistics, roundNumberTo2 } from "@shared/lib/utils";
import { calculateAverageValue } from "@shared/lib/utils/calculate-average-value";
import { calculateMedianValue } from "@shared/lib/utils/calculate-median-value";
import { DoughnutDiagram, BarDiagram } from "@shared/ui";
import DiagramWrapper from "@shared/ui/diagrams/diagram-wrapper";
import { StatisticsItem } from "@shared/ui/statistics-item.component";
import { IInfluencer } from "@widgets/influencer";
import InfluencerDiagramLegendElem from "@widgets/influencer/insigths/diagram-legend.component";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

type InfluencerYoutubePage = [influencer: IInfluencer, shareToken: string];

export const ShareInfluencerYoutubeInsightsPage = () => {
  const [influencer, shareToken] = useOutletContext<InfluencerYoutubePage>();
  const store = useInsightsStore();
  const {
    data: localStatistics,
    isLoading: isLocalStatisticsLoading,
    isError: isLocalStatisticsError,
  } = useYoutubeStatisticsByInfluencerIdWithVerificationCodeQuery({
    influencerId: influencer.id,
    verificationCode: shareToken,
    from: store.dates.from,
    to: store.dates.to,
  });
  const {
    data: postsStatistics,
    isLoading: isPostsStatisticsLoading,
    isError: isPostsStatisticsError,
  } = useYoutubePostsStatisticsByInfluencerIdWithVerificationCodeQuery({
    influencerId: influencer.id,
    verificationCode: shareToken,
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
    if (!localStatistics || localStatistics.countries.length === 0) {
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

  if (isLocalStatisticsLoading) {
    return (
      <div className="flex items-center justify-center w-9/12 pl-8 text-xl text-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (!localStatistics || isLocalStatisticsError) {
    return (
      <div className="flex items-center justify-center w-9/12 pl-8 text-xl text-center">
        <p>You have not connected the YouTube account of this influencer</p>
      </div>
    );
  }

  return (
    <div className="w-9/12 pl-8">
      <h2 className="mb-2 text-xl">All time statistics</h2>
      <div className="mb-3 grid grid-cols-4 gap-3">
        <StatisticsItem label="Followers" value={localStatistics.subscribersCount} />
        <StatisticsItem
          label="Average Views"
          value={localStatistics.views}
          tooltipText="Average amount of views across all posts"
        />
        <StatisticsItem
          label="Eng. Rate"
          value={`${roundNumberTo2(Number(localStatistics.engagementRate))}%`}
          tooltipText="Ratio of an app's engaged users and active users"
        />
        <StatisticsItem
          label="Completion Rate"
          value={`${
            roundNumberTo2(Number(localStatistics?.rate.averageViewPercentage)) ?? 0
          }%`}
          tooltipText="The average percentage of a video watched during a video playback"
        />
      </div>
      <h2 className="mb-2 text-xl">
        {store.statisticsType === StatisticsTypesEnum.Average ? "Average" : "Median"}{" "}
        statistics
      </h2>
      <div className="mb-3 grid grid-cols-3 gap-3">
        {!postsStatistics || isPostsStatisticsError ? (
          <div className="col-start-1 col-end-4 h-20 flex justify-center items-center bg-white p-2 rounded-xl shadow-2xl">
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
      <div className="flex gap-3">
        <div className="w-6/12 p-4 bg-white rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Gender</div>
          {localStatistics.genders.male || localStatistics.genders.female ? (
            <>
              <DiagramWrapper className="mb-4">
                <DoughnutDiagram
                  data={{
                    labels: ["Male", "Female"],
                    datasets: [
                      {
                        label: " ",
                        data: [
                          localStatistics.genders.male,
                          localStatistics.genders.female,
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
                  <span>Male ({localStatistics.genders.male})</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-orange mr-4"></span>
                  <span>Female ({localStatistics.genders.female})</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-end text-lg min-h-[14rem]">
              Not enough data about gender
            </div>
          )}
        </div>

        <div className="w-6/12 p-4 bg-white rounded-xl flex flex-col justify-between shadow-2xl">
          <div className="text-xl mb-4">Age</div>
          {localStatistics.ages.length > 0 ? (
            <BarDiagram
              data={{
                labels: localStatistics.ages.map((age) => age.name),
                datasets: [
                  {
                    label: "Users",
                    data: localStatistics.ages.map((age) => age.count),
                    backgroundColor: "#7690ed",
                  },
                ],
              }}
            />
          ) : (
            <div className="text-lg">Not enough data about age</div>
          )}
        </div>
      </div>
      <div className="flex mt-3 space-x-3">
        <div className="w-6/12 p-4 bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="text-xl mb-4">Country</div>
          {countriesStatistics.length > 0 ? (
            <>
              <DiagramWrapper>
                <DoughnutDiagram
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
              </DiagramWrapper>
              <div className="space-y-3 mt-auto">
                {countriesStatistics.map((country, index) => (
                  <InfluencerDiagramLegendElem
                    key={country.name}
                    label={country.name}
                    color={DiagramColors[index]}
                    value={Number(country.count)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-lg flex items-end min-h-[24rem]">
              Not enough data about countries
            </div>
          )}
        </div>
        <div className="w-6/12 p-4 bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="text-xl mb-4">Devices</div>
          {Number(localStatistics.devices.DESKTOP) > 0 &&
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
                        data: Object.values(localStatistics.devices).map((deviceCount) =>
                          Number(deviceCount)
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
    </div>
  );
};
