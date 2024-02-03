import {
  useQuotesInfiniteQuery,
  useUpdateIsQuoteArchivedMutation,
} from "@entities/quote";
import { Loader, Button, SegmentedControl, Checkbox } from "@mantine/core";
import { ItemsPerPage } from "@shared/lib/constants";
import { SavedQuoteRaw } from "./saved-quote-row.component";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

enum SavedQuotesTypesEnum {
  Active = "Active",
  Archived = "Archived",
}

export const SavedQuotesTab = () => {
  const [quotesType, setQuotesType] = useState<SavedQuotesTypesEnum>(
    SavedQuotesTypesEnum.Active
  );

  const {
    data: quotes,
    isLoading: isQuotesLoading,
    isError: isQuotesError,
    hasNextPage,
    fetchNextPage,
  } = useQuotesInfiniteQuery({
    limit: ItemsPerPage,
    type: quotesType,
  });
  const { mutateAsync: updateIsQuoteArchived } = useUpdateIsQuoteArchivedMutation();

  const [selectedQuoteIds, setSelectedQuoteIds] = useState<number[]>([]);

  const handleQuoteSelect = (quoteId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedQuoteIds((state) => [...state, quoteId]);
      return;
    }
    setSelectedQuoteIds((state) => state.filter((id) => id !== quoteId));
  };

  const handleAllQuotesSelect = (isSelected: boolean) => {
    if (!quotes) {
      return;
    }
    if (isSelected) {
      const quoteIds: number[] = [];
      quotes.pages.forEach((page) => {
        return page.items.forEach((quote) => quoteIds.push(quote.id));
      });
      setSelectedQuoteIds(quoteIds);
      return;
    }
    setSelectedQuoteIds([]);
  };

  const handleQuoteTypeChange = (type: SavedQuotesTypesEnum) => {
    handleAllQuotesSelect(false);
    setQuotesType(type);
  };

  const handleUpdateIsSelectedQuotesArchived = async () => {
    if (selectedQuoteIds.length === 0 || !quotes) {
      return;
    }
    try {
      const updateIsQuoteArchivedPromises = selectedQuoteIds.map((quoteId) => {
        return updateIsQuoteArchived({
          quoteId,
          isArchived: quotesType === SavedQuotesTypesEnum.Active,
        });
      });
      await Promise.all(updateIsQuoteArchivedPromises);
      handleAllQuotesSelect(false);
      toast.success(
        `Quotes was successfully ${
          quotesType === SavedQuotesTypesEnum.Active ? "archived" : "unarchived"
        }`
      );
    } catch (error: any) {
      console.error("update is quotes archived error:", error);
      toast.error("Something went wrong. Please, try again later.");
    }
  };

  if (isQuotesLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isQuotesError || !quotes) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>
          Looks like some problem with quotes occurs
          <br />
          Please, try again later
        </p>
      </div>
    );
  }

  return (
    <div className="text-md">
      <div className="flex justify-between items-center gap-5 text-lg">
        <Button
          color="dark"
          radius="lg"
          size="md"
          disabled={selectedQuoteIds.length === 0}
          onClick={handleUpdateIsSelectedQuotesArchived}
        >
          {quotesType === SavedQuotesTypesEnum.Active ? "Archive" : "Unarchive"}
        </Button>
        <div className="w-3/12 ml-auto">
          <SegmentedControl
            className="h-fit"
            fullWidth
            size="lg"
            radius="lg"
            color="dark"
            data={[SavedQuotesTypesEnum.Active, SavedQuotesTypesEnum.Archived]}
            value={quotesType}
            onChange={(value) => handleQuoteTypeChange(value as SavedQuotesTypesEnum)}
          />
        </div>
      </div>
      <div className="mt-10">
        {quotes.pages.length === 0 || quotes.pages[0]?.items?.length === 0 ? (
          <div className="flex items-center justify-center text-xl min-h-[30rem]">
            <p>
              There is no{" "}
              {quotesType === SavedQuotesTypesEnum.Active ? "active" : "archived"} quotes
              yet
            </p>
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-[3] grid grid-cols-5 items-center bg-slate-100 px-3 rounded-t-2xl">
              <div className="px-3 py-6 flex items-center gap-3">
                <Checkbox
                  color="dark"
                  size="md"
                  checked={selectedQuoteIds.length > 0}
                  onChange={(event) => handleAllQuotesSelect(event.target.checked)}
                />
                <div className="flex items-center cursor-pointer">
                  <p>Talent</p>
                </div>
              </div>
              <div className="px-3 py-6">
                <p>Brand</p>
              </div>
              <div className="px-3 py-6">
                <p>Campaign</p>
              </div>
              <div className="px-3 py-6">
                <p>Total Fee inc AST (ex GST)</p>
              </div>
            </div>

            <div className="bg-white rounded-b-2xl">
              {quotes.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.items.map((quote) => (
                    <SavedQuoteRaw
                      key={quote.id}
                      quote={quote}
                      isSelected={selectedQuoteIds.some((id) => id === quote.id)}
                      onSelect={handleQuoteSelect}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
            {hasNextPage && (
              <div className="py-5 flex justify-center">
                <Button className="mx-auto" onClick={() => fetchNextPage()}>
                  Show more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
