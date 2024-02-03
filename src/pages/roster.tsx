import authApi from "@features/auth/api/auth.api";
import { Button, Checkbox, SegmentedControl } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useCSV } from "@shared/lib/utils";
import { IconComponent } from "@shared/ui/icon";
import { IInfluencer } from "@widgets/influencer";
import {
  RosterRow,
  SortOrder,
  getAllIActiveInfluencers,
  getAllIArchivedInfluencers,
} from "@widgets/roster";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const cellClasses = "flex items-center px-3 py-6 w-4/12";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const RosterPage = () => {
  const [influencers, setInfluencers] = useState<IInfluencer[] | null>(null);
  const [checkedRows, setCheckedRows] = useListState<IInfluencer>([]);
  const [isLeastOneRowChecked, setIsLeastOneRowChecked] = useState<boolean>(false);
  const [uniqueGroupIDs, setUniqueGroupIDs] = useState<number[]>([]);

  const [nameOrder, setNameOrder] = useState<SortOrder | undefined>("ASC");
  const [stateOrder, setStateOrder] = useState<SortOrder | undefined>("ASC");
  const [contractStartOrder, setContractStartOrder] = useState<SortOrder | undefined>(
    "ASC"
  );
  const [contractEndOrder, setContractEndOrder] = useState<SortOrder | undefined>("ASC");

  const [isMounted, setMounted] = useState<boolean>(false);

  const { isCheckedRowsInArray, generateIDsStringForCSV } = useCSV();

  const allChecked = checkedRows.every((value) => value.checked);
  const indeterminate = checkedRows.some((value) => value.checked) && !allChecked;

  const generateArrayForCheckboxes = (array: IInfluencer[]) => {
    array &&
      array.forEach((item) => {
        item.checked = false;
      });
    setCheckedRows.setState(array);
  };

  const generateUniqueGroupIDsArray = (array: IInfluencer[]) => {
    const newArray: number[] = [];
    const groupSet: Set<string> = new Set();

    array.forEach((user) => {
      if (!user.group) {
        if (!groupSet.has("Talents without group hardcode")) {
          groupSet.add("Talents without group hardcode");
          newArray.push(user.id);
        }
        return;
      }

      if (!groupSet.has(user.group.name)) {
        groupSet.add(user.group.name);
        newArray.push(user.id);
      }
    });

    newArray.length !== null && setUniqueGroupIDs(newArray);
  };

  const requestAllInfluencers = async (archived: boolean) => {
    try {
      let response;
      if (archived) {
        response = await getAllIArchivedInfluencers();
      } else {
        response = await getAllIActiveInfluencers(
          nameOrder,
          stateOrder,
          contractStartOrder,
          contractEndOrder
        );
      }

      // const sortedArray = sortInfluencerByGroup(response.data);

      setInfluencers(response.data);
      generateArrayForCheckboxes(response.data);
      generateUniqueGroupIDsArray(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error on loading data about influencers");
    }
  };

  const requestCSVFile = async () => {
    const requestString = generateIDsStringForCSV(checkedRows);
    if (requestString != "")
      try {
        await authApi.get(`influencer/csv/generate?${requestString}`);

        window.open(`${BASE_URL}/influencer/csv/generate?${requestString}`, "_blank");

        toast.success("The file was downloaded successfully");
      } catch (error) {
        console.log(error);
      } finally {
        console.log(`influencer/csv/generate?${requestString}`);
      }
  };

  useEffect(() => {
    requestAllInfluencers(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    isMounted && requestAllInfluencers(false);
  }, [nameOrder, stateOrder, contractStartOrder, contractEndOrder]);

  useEffect(() => {
    const isCheckedRows = isCheckedRowsInArray(checkedRows);
    setIsLeastOneRowChecked(isCheckedRows);
  }, [checkedRows]);

  const handleOrderFilterSet = (
    type: "name" | "contractStartDate" | "contractEndDate" | "state"
  ) => {
    switch (type) {
      case "name": {
        setNameOrder((state) => (state === "ASC" ? "DESC" : "ASC"));
        setContractStartOrder(undefined);
        setContractEndOrder(undefined);
        setStateOrder(undefined);
        break;
      }
      case "contractStartDate": {
        setNameOrder(undefined);
        setContractStartOrder((state) => (state === "ASC" ? "DESC" : "ASC"));
        setContractEndOrder(undefined);
        setStateOrder(undefined);
        break;
      }
      case "contractEndDate": {
        setNameOrder(undefined);
        setContractStartOrder(undefined);
        setContractEndOrder((state) => (state === "ASC" ? "DESC" : "ASC"));
        setStateOrder(undefined);
        break;
      }
      case "state": {
        setNameOrder(undefined);
        setContractStartOrder(undefined);
        setContractEndOrder(undefined);
        setStateOrder((state) => (state === "ASC" ? "DESC" : "ASC"));
        break;
      }
      default: {
        setNameOrder("ASC");
        setContractStartOrder(undefined);
        setContractEndOrder(undefined);
        setStateOrder(undefined);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <Button
          color="dark"
          radius="lg"
          size="lg"
          onClick={requestCSVFile}
          className={clsx(
            "transition-all",
            !isLeastOneRowChecked && "pointer-events-none opacity-30"
          )}
        >
          Export to .csv
        </Button>
        <Button
          color="dark"
          radius="lg"
          size="lg"
          component={Link}
          to="/app/create-influencer"
          className="ml-4"
        >
          Add Talent
        </Button>
        <div className="w-3/12 ml-auto">
          <SegmentedControl
            className="h-fit"
            fullWidth
            size="lg"
            radius="lg"
            color="dark"
            data={["Active", "Archived"]}
            onChange={(value) => {
              if (value === "Archived") {
                requestAllInfluencers(true);
              } else {
                requestAllInfluencers(false);
              }
            }}
          />
        </div>
      </div>
      {influencers && influencers.length > 0 && (
        <div className="mt-7 text-[1rem] leading-none">
          <div className="sticky top-0 z-[3] flex items-center bg-slate-100 px-4 rounded-t-2xl">
            <Checkbox
              size="md"
              color="dark"
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={() =>
                setCheckedRows.setState((current) =>
                  current.map((value) => ({
                    ...value,
                    checked: !allChecked,
                  }))
                )
              }
            />
            <div className="flex  w-[calc(100%_-_2rem)]">
              <div
                className={clsx(cellClasses, "cursor-pointer")}
                onClick={() => handleOrderFilterSet("name")}
              >
                <span>Name</span>
                <span
                  className={clsx(nameOrder === "ASC" && "rotate-180", "transition-all")}
                >
                  <IconComponent name="filterArrow" />
                </span>
              </div>
              <div className={clsx(cellClasses)}>Email</div>
              <div className={clsx(cellClasses)}>YouTube Profile</div>
              <div className={clsx(cellClasses)}>TikTok Profile</div>
              <div className={clsx(cellClasses)}>Instagram Profile</div>
              <div
                className={clsx(cellClasses, "cursor-pointer")}
                onClick={() => handleOrderFilterSet("contractStartDate")}
              >
                <span>Initial end</span>
                <span
                  className={clsx(
                    contractStartOrder === "ASC" && "rotate-180",
                    "transition-all"
                  )}
                >
                  <IconComponent name="filterArrow" />
                </span>
              </div>
              <div
                className={clsx(cellClasses, "cursor-pointer")}
                onClick={() => handleOrderFilterSet("contractEndDate")}
              >
                <span>Contract end</span>
                <span
                  className={clsx(
                    contractEndOrder === "ASC" && "rotate-180",
                    "transition-all"
                  )}
                >
                  <IconComponent name="filterArrow" />
                </span>
              </div>
              <div
                className={clsx(cellClasses, "w-1/12 flex cursor-pointer pr-0")}
                onClick={() => handleOrderFilterSet("state")}
              >
                <span>State</span>
                <span
                  className={clsx(stateOrder === "ASC" && "rotate-180", "transition-all")}
                >
                  <IconComponent name="filterArrow" />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-b-2xl">
            {influencers.map((influencer, index) => (
              <RosterRow
                key={influencer.id}
                index={index}
                influencer={influencer}
                checkedInfo={{ checkedRows, setCheckedRows }}
                uniqueGroupIDs={uniqueGroupIDs}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
