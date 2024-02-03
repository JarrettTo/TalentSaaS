import { BarDiagram, BarPercentage, DoughnutDiagram } from "@shared/ui";
import { IInfluencer } from "../types";
import { useEffect, useState } from "react";
import { getInfluencerInstagramStatistics } from "../api";
import { get30DaysAgo, get90DaysAgo, roundNumber } from "@shared/lib/utils";
import { Loader } from "@mantine/core";
import InfluencerDiagramLegendElem from "./diagram-legend.component";
import DiagramWrapper from "@shared/ui/diagrams/diagram-wrapper";
import axios from "axios";
import useInsightsStore from "@shared/lib/stores/insights-store.hook";
import PercentageWrapper from "@shared/ui/diagrams/percentage-wrapper";
import { DiagramColors } from "@shared/lib/constants";

type InfluencerInsightsGridProps = {
  influencer: IInfluencer;
  shareToken?: string | null;
};

const cellClasses =
  "flex flex-col justify-between bg-white p-4 rounded-xl w-4/12 shadow-2xl";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const genderDiagramLegend = [
  { label: "Female", color: "#f89e72" },
  { label: "Male", color: "#f77333" },
  { label: "Unknown", color: "#c4d1ff" },
];

const countryColors = ["#f89e72", "#f77333", "#c4d1ff", "#7690ed", "#D3D3D3"];

const ageLabels = ["13-17", "18-24", "25-34", "45-54", "55-64", "65+"];

const ageDiagramLegend = [
  { label: "Female", color: "#c4d1ff" },
  { label: "Male", color: "#7690ed" },
  { label: "Unknown", color: "#5e79b3" },
];

type IInstagramData = {
  followersCount: number;
  engagement: number;
  impressions: number;
};

export const InfluencerInsightsGridInstagram = (props: InfluencerInsightsGridProps) => {
  const { influencer, shareToken } = props;
  const store = useInsightsStore();

  const [instagramData, setInstagramData] = useState<IInstagramData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [countriesStatistics, setCountriesStatistics] = useState<
    { name: string; count: number }[]
  >([]);
  const [genderStatistics, setGenderStatistics] = useState<
    { name: string; count: number }[]
  >([]);
  const [genderAgesStatistics, setGenderAgesStatistics] = useState<{
    F: { name: string; count: number }[];
    M: { name: string; count: number }[];
    U: { name: string; count: number }[];
  } | null>(null);

  const fetchInstagram = async () => {
    setInstagramData(null);
    setLoading(true);

    try {
      let response;
      let dateQueryParams = "";
      if (store.dates && store.dates.from !== "") {
        const wrong30days = get30DaysAgo();
        const wrong90days = get90DaysAgo();
        if (store.dates.from === wrong90days) {
          dateQueryParams = "?date=last_90_days";
        } else if (store.dates.from === wrong30days) {
          dateQueryParams = "?date=last_30_days";
        }
      }

      if (shareToken) {
        if (dateQueryParams !== "") {
          response = await axios.get(
            `${BASE_URL}/instagram/${influencer.id}/unauthorized/${shareToken}${dateQueryParams}`
          );
        } else {
          response = await axios.get(
            `${BASE_URL}/instagram/${influencer.id}/unauthorized/${shareToken}`
          );
        }

        response = response.data.data;
        console.log("response", response);
      } else {
        response = await getInfluencerInstagramStatistics(influencer.id, dateQueryParams);
      }

      if (response) {
        setInstagramData(response);

        console.log(response);

        const rawCountriesArray = [...response?.countries];
        const sortedCountries = rawCountriesArray
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);
        const otherCountriesData = { name: "Other countries", count: 0 };
        rawCountriesArray.forEach((country, index) => {
          if (index > 4) {
            otherCountriesData.count += country.count;
          }
        });

        const genderAgesObject: {
          F: { name: string; count: number }[];
          M: { name: string; count: number }[];
          U: { name: string; count: number }[];
        } = { F: [], M: [], U: [] };
        response.genderAges.forEach((genderAge: any) => {
          const [gender, age] = genderAge.name.split("_");
          genderAgesObject[gender as keyof typeof genderAgesObject].push({
            name: age,
            count: genderAge.count,
          });
        });

        setGenderStatistics(response.genders);
        setCountriesStatistics([...sortedCountries, otherCountriesData]);
        setGenderAgesStatistics(genderAgesObject);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchInstagram();
  }, [store.dates]);

  return instagramData ? (
    <div className="w-9/12 pl-8">
      <div className="flex space-x-3">
        <div className={cellClasses}>
          <div className="text-lg">Followers</div>
          <div className="text-5xl mt-3">{instagramData.followersCount}</div>
        </div>
        <div className={cellClasses}>
          <div className="text-lg">Impressions</div>
          <div className="text-5xl mt-3">{instagramData.impressions}</div>
        </div>
        <div className={cellClasses}>
          <div className="text-lg">Eng. Rate</div>
          <div className="text-5xl mt-3">{roundNumber(instagramData.engagement)}%</div>
        </div>
        {/* <div className={cellClasses}>
          <div className="text-lg">Top post type</div>
          <div className="text-5xl mt-3"></div>
        </div> */}
      </div>
      <div className="flex mt-3 space-x-3">
        <div className="w-6/12 p-4 bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="text-xl mb-4">Gender</div>
          {genderStatistics.length > 0 ? (
            <>
              <DiagramWrapper className="mt-2">
                <DoughnutDiagram
                  data={{
                    labels: genderStatistics.map((gender) => gender.name),
                    datasets: [
                      {
                        label: " ",
                        data: genderStatistics.map((gender) => gender.count),
                        backgroundColor: ["#f89e72", "#f77333", "#c4d1ff"],
                      },
                    ],
                  }}
                />
              </DiagramWrapper>
              <div className="space-y-3 mt-auto">
                {genderDiagramLegend.map((genderDiagramLegendItem, idx) => (
                  <InfluencerDiagramLegendElem
                    key={idx}
                    label={genderDiagramLegendItem.label}
                    color={genderDiagramLegendItem.color}
                    value={genderStatistics[idx]?.count}
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

        <div className="flex flex-col justify-between w-6/12 p-4 bg-white rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Country</div>
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
            <div className="text-lg">Not enough data about countries</div>
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
  ) : (
    <div className="flex items-center justify-center w-9/12 pl-8 text-xl text-center">
      {loading ? (
        <Loader color="orange" />
      ) : (
        "You have not connected the Instagram account of this influencer"
      )}
    </div>
  );
};
