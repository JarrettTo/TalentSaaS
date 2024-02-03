import { useInstagramStatisticsByInfluencerIdWithVerificationCodeQuery } from "@entities/instagram-statistics";
import { Loader } from "@mantine/core";
import { DiagramColors } from "@shared/lib/constants";
import { formatCountriesStatistics, roundNumberTo2 } from "@shared/lib/utils";
import { DoughnutDiagram, BarDiagram } from "@shared/ui";
import DiagramWrapper from "@shared/ui/diagrams/diagram-wrapper";
import { StatisticsItem } from "@shared/ui/statistics-item.component";
import { IInfluencer } from "@widgets/influencer";
import InfluencerDiagramLegendElem from "@widgets/influencer/insigths/diagram-legend.component";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ageLabels = ["13-17", "18-24", "25-34", "45-54", "55-64", "65+"];

const ageDiagramLegend = [
  { label: "Female", color: "#c4d1ff" },
  { label: "Male", color: "#7690ed" },
  { label: "Unknown", color: "#5e79b3" },
];

type InfluencerInstagramType = [influencer: IInfluencer, shareToken: string];

export const ShareInfluencerInstagramInsightsPage = () => {
  const [influencer, shareToken] = useOutletContext<InfluencerInstagramType>();
  const {
    data: localStatistics,
    isLoading: isLocalStatisticsLoading,
    isError: isLocalStatisticsError,
  } = useInstagramStatisticsByInfluencerIdWithVerificationCodeQuery({
    influencerId: influencer.id,
    verificationCode: shareToken,
  });

  const [countriesStatistics, setCountriesStatistics] = useState<
    { name: string; count: string }[]
  >([]);
  const [genderAgesStatistics, setGenderAgesStatistics] = useState<{
    F: { name: string; count: number }[];
    M: { name: string; count: number }[];
    U: { name: string; count: number }[];
  } | null>(null);

  useEffect(() => {
    if (!localStatistics || localStatistics.countries.length === 0) {
      return;
    }
    const formattedCountriesStatistics = formatCountriesStatistics(
      localStatistics.countries
    );
    setCountriesStatistics(formattedCountriesStatistics);
    if (localStatistics.genderAges.length === 0) {
      return;
    }
    const genderAgesObject: {
      F: { name: string; count: number }[];
      M: { name: string; count: number }[];
      U: { name: string; count: number }[];
    } = { F: [], M: [], U: [] };
    localStatistics.genderAges.forEach((genderAge: any) => {
      const [gender, age] = genderAge.name.split("_");
      genderAgesObject[gender as keyof typeof genderAgesObject].push({
        name: age,
        count: genderAge.count,
      });
    });
    setGenderAgesStatistics(genderAgesObject);
  }, [localStatistics]);

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
        <p>You have not connected the Instagram account of this influencer</p>
      </div>
    );
  }

  return (
    <div className="w-9/12 pl-8">
      <h2 className="mb-2 text-xl">All time statistics</h2>
      <div className="mb-3 grid grid-cols-4 gap-3">
        <StatisticsItem label="Followers" value={localStatistics.followersCount} />
        <StatisticsItem label="Impressions" value={localStatistics.impressions} />
        <StatisticsItem
          label="Eng. Rate"
          value={`${roundNumberTo2(Number(localStatistics.engagement))}%`}
          tooltipText="Ratio of an app's engaged users and active users"
        />
      </div>
      <h2 className="mb-2 text-xl">All time diagrams</h2>
      <div className="flex gap-3">
        <div className="w-6/12 p-4 bg-white rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Gender</div>
          {localStatistics.genders.length > 0 ? (
            <>
              <DiagramWrapper className="mb-4">
                <DoughnutDiagram
                  data={{
                    labels: localStatistics.genders.map((gender) => gender.name),
                    datasets: [
                      {
                        label: " ",
                        data: localStatistics.genders.map((gender) =>
                          Number(gender.count)
                        ),
                        backgroundColor: ["#f77333", "#7690ed"],
                      },
                    ],
                  }}
                />
              </DiagramWrapper>
              <div className="space-y-3 ml-4">
                {localStatistics.genders.map((gender, index) => (
                  <InfluencerDiagramLegendElem
                    key={gender.name}
                    label={gender.name}
                    color={DiagramColors[index]}
                    value={Number(gender.count)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-end text-lg min-h-[14rem]">
              Not enough data about gender
            </div>
          )}
        </div>
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
      </div>

      <div className="flex mt-3 space-x-3">
        <div className="w-full p-4 bg-white rounded-xl flex flex-col justify-between shadow-2xl">
          <div className="text-xl mb-4">Age</div>
          {genderAgesStatistics ? (
            <>
              <BarDiagram
                data={{
                  labels: ageLabels,
                  datasets: [
                    {
                      label: "Female",
                      data: genderAgesStatistics.F.map((age) => age.count),
                      backgroundColor: "#c4d1ff",
                    },
                    {
                      label: "Male",
                      data: genderAgesStatistics.M.map((age) => age.count),
                      backgroundColor: "#7690ed",
                    },
                    {
                      label: "Unknown",
                      data: genderAgesStatistics.U.map((age) => age.count),
                      backgroundColor: "#5e79b3",
                    },
                  ],
                }}
              />
              <div className="space-y-3 mt-4">
                {ageDiagramLegend.map((ageDiagramLegendItem, idx) => (
                  <InfluencerDiagramLegendElem
                    key={idx}
                    label={ageDiagramLegendItem.label}
                    color={ageDiagramLegendItem.color}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-end text-lg min-h-[14rem]">
              Not enough data about age
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
