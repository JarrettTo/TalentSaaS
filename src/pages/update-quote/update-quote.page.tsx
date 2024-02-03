import {
  useQuoteByIdQuery,
  IEditableQuoteItem,
  useUpdateQuoteMutation,
  useQuoteLogByIdQuery,
  DeliverablesDictionaryEntries,
  DeliverablesDictionary,
} from "@entities/quote";
import { QuotePlacementPostTypesForm } from "@features/quote-placement-post-types-form";
import { Button, Loader, Modal, clsx } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IDeliverables } from "@shared/lib/types";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { QuoteItemRow } from "./ui";
import { PlacementTypesEnum, getPlacementByInfluencerId } from "@entities/placement";
import { calculateTotalFee } from "@entities/quote/lib/utils/calculate-total-fee";

const subtitleClasses = "text-2xl mb-1";
const cellClasses = "py-6 px-6";

export const UpdateQuotePage = () => {
  const { quoteId } = useParams();
  const {
    data: quote,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
  } = useQuoteByIdQuery(quoteId ? Number(quoteId) : undefined);
  const {
    data: quoteLog,
    isLoading: isQuoteLogLoading,
    isError: isQuoteLogError,
  } = useQuoteLogByIdQuery(quoteId ? Number(quoteId) : undefined);
  const { mutateAsync: updateQuote } = useUpdateQuoteMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const [editableQuoteItems, setEditableQuoteItems] = useState<IEditableQuoteItem[]>([]);
  const [deliverablesAmount, setDeliverablesAmount] = useState(0);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<IEditableQuoteItem | null>(
    null
  );

  const setDefaultQuoteInfo = () => {
    if (!quote) {
      return;
    }
    const extendQuoteItems = async () => {
      try {
        const getPlacementsArrayPromises = quote.quotes.map((quoteItem) => {
          return getPlacementByInfluencerId(quoteItem.influencer.id);
        });
        const placementsArray = await Promise.all(getPlacementsArrayPromises);
        const extendedQuoteItems = quote.quotes.map((quoteItem) => {
          let extendedQuoteItem: IEditableQuoteItem | undefined;
          placementsArray.forEach((placements) => {
            placements.forEach((placement) => {
              if (placement.type === PlacementTypesEnum.YouTube && quoteItem.isYoutube) {
                extendedQuoteItem = {
                  ...quoteItem,
                  talentFee: placement.talantFee,
                  shouldUpdate: false,
                };
              }
              if (
                placement.type === PlacementTypesEnum.Instagram &&
                quoteItem.isInstagram
              ) {
                extendedQuoteItem = {
                  ...quoteItem,
                  talentFee: placement.talantFee,
                  shouldUpdate: false,
                };
              }
              if (placement.type === PlacementTypesEnum.TikTok && quoteItem.isTiktok) {
                extendedQuoteItem = {
                  ...quoteItem,
                  talentFee: placement.talantFee,
                  shouldUpdate: false,
                };
              }
            });
          });
          if (!extendedQuoteItem) {
            throw new Error("invalid quote values calculation");
          }
          return extendedQuoteItem;
        });
        setEditableQuoteItems(extendedQuoteItems);
      } catch (error: any) {
        console.error("extend quote items error:", error);
      }
    };
    extendQuoteItems();
  };

  useEffect(() => {
    setDefaultQuoteInfo();
  }, [quote]);

  const handleDeliverablesEditClick = (
    quoteItem: IEditableQuoteItem,
    deliverablesAmount: number
  ) => {
    setDeliverablesAmount(deliverablesAmount);
    setSelectedQuoteItem(quoteItem);
    open();
  };

  const handleUpdateDeliverablesFormSubmit = (
    quoteItemId: number,
    deliverables: IDeliverables
  ) => {
    const updatedQuoteItems = editableQuoteItems.map((quoteItem) => {
      if (quoteItem.id === quoteItemId) {
        return { ...quoteItem, ...deliverables, shouldUpdate: true };
      }
      return quoteItem;
    });
    setEditableQuoteItems(updatedQuoteItems);
    close();
  };

  const handleUpdateQuote = async () => {
    try {
      const updateQuotePromises: Promise<void>[] = [];
      editableQuoteItems.forEach((quoteItem) => {
        if (!quoteItem.shouldUpdate) {
          return;
        }
        const updateQuotePromise = updateQuote({
          quoteId: quoteItem.id,
          influencerId: quoteItem.influencer.id,
          totalFee: calculateTotalFee(
            { ...quoteItem },
            Number(quoteItem?.talentFee || 0)
          ),
          crossPost: quoteItem.crossPost,
          instaStorySet: quoteItem.instaStorySet,
          linkInBio: quoteItem.linkInBio,
          amplificationDigital: quoteItem.amplificationDigital,
          amplificationDigitalMonths: quoteItem.amplificationDigitalMonths,
          amplificationDigitalMonthsRange: quoteItem.amplificationDigitalMonthsRange,
          amplificationTraditional: quoteItem.amplificationTraditional,
          amplificationTraditionalMonths: quoteItem.amplificationTraditionalMonths,
          amplificationTraditionalMonthsRange:
            quoteItem.amplificationTraditionalMonthsRange,
          exclusivity: quoteItem.exclusivity,
          exclusivityMonths: quoteItem.exclusivityMonths,
          exclusivityMonthsRange: quoteItem.exclusivityMonthsRange,
          shootDay: quoteItem.shootDay,
          paidMedia: quoteItem.paidMedia,
          UGCCreative: quoteItem.UGCCreative,
          isInstagram: quoteItem.isInstagram,
          isYoutube: quoteItem.isYoutube,
          isTiktok: quoteItem.isTiktok,
        });
        updateQuotePromises.push(updateQuotePromise);
      });
      await Promise.all(updateQuotePromises);
      toast.success("Quote updated successfully");
    } catch (error: any) {
      console.error("update quote error:", error);
      toast.error("Some error occurs. Please, try again later.");
    }
  };

  const renderQuoteChanges = () => {
    if (!quote || !quoteLog) {
      return null;
    }
    const changesList: ReactNode[] = [];
    quoteLog.quotesLogs.forEach((quoteLogItem) => {
      DeliverablesDictionaryEntries.forEach(([key, value]) => {
        const quoteItem = quote.quotes.find(({ id }) => id === quoteLogItem.quoteId);
        if (!quoteItem) {
          return;
        }
        const previousPropertyValue = quoteLogItem[key];
        const currentPropertyValue = quoteItem[key];
        if (
          currentPropertyValue === null ||
          previousPropertyValue === null ||
          currentPropertyValue === previousPropertyValue
        ) {
          return;
        }
        let platform = "";
        if (quoteLogItem.isYoutube) {
          platform = "YouTube";
        }
        if (quoteLogItem.isInstagram) {
          platform = "Instagram";
        }
        if (quoteLogItem.isTiktok) {
          platform = "TikTok";
        }
        let propertyTitle = "";
        switch (key) {
          case "amplificationDigitalMonthsRange": {
            propertyTitle = `${DeliverablesDictionary.amplificationDigitalMonths.title} duration`;
            break;
          }
          case "amplificationTraditionalMonthsRange": {
            propertyTitle = `${DeliverablesDictionary.amplificationTraditionalMonths.title} duration`;
            break;
          }
          case "exclusivityMonthsRange": {
            propertyTitle = `${DeliverablesDictionary.exclusivityMonths.title} duration`;
            break;
          }
          default: {
            propertyTitle = value.title;
          }
        }
        changesList.push(
          <li key={key} className="mb-3">
            <p className="text-lg">
              Updated by {quoteLogItem.manager.email} at{" "}
              {new Date(quoteLogItem.createdAt).toLocaleDateString()}
            </p>
            <p>
              For {quoteItem.influencer.firstname} {quoteItem.influencer.lastname}{" "}
              {platform}
            </p>
            <p>
              Property {propertyTitle} changed from {previousPropertyValue} to{" "}
              {currentPropertyValue}
            </p>
          </li>
        );
      });
    });
    if (changesList.length === 0) {
      return (
        <div className="flex items-center justify-center text-xl h-36">
          <p>Nothing has changed yet</p>
        </div>
      );
    }
    return <ul className="pl-6 py-3 bg-white rounded-xl">{changesList}</ul>;
  };

  if (isQuoteLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isQuoteError || !quote) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p className="text-center">
          Looks like some problem with quote occurs
          <br />
          Please, try again later
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-7">Edit quote</h1>
      <div className="mb-7 flex gap-5">
        <div className="grow">
          <p className={subtitleClasses}>Brand</p>
          <p className="text-xl">{quote.brand}</p>
        </div>
        <div className="grow">
          <p className={subtitleClasses}>Campaign</p>
          <p className="text-xl">{quote.name}</p>
        </div>
      </div>
      <div className="mb-5 bg-white text-xl rounded-2xl shadow-xl">
        <div className="grid grid-cols-[1fr,1fr,1fr,2fr,1fr] border-0 border-b border-solid">
          <div className={clsx(cellClasses)}>
            <p>Talent</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Placement</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Deliverables</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Deliverables types</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Total Fee inc AST (ex GST)</p>
          </div>
        </div>
        {editableQuoteItems.map((quoteItem) => (
          <QuoteItemRow
            key={quoteItem.id}
            quoteItem={quoteItem}
            onDeliverablesEditClick={handleDeliverablesEditClick}
          />
        ))}
      </div>
      <p>
        * If you change deliverables value - make sure to change amounts in cross post
        window
      </p>
      <div className="flex justify-end gap-5">
        <Button color="dark" radius="lg" size="md" onClick={setDefaultQuoteInfo}>
          Reset
        </Button>
        <Button color="orange" radius="lg" size="md" onClick={handleUpdateQuote}>
          Save
        </Button>
      </div>
      <h2 className="mb-3">History</h2>
      {isQuoteLogLoading && (
        <div className="h-44 px-6 py-3 flex justify-center items-center text-xl bg-white rounded-xl">
          <div className="flex items-center gap-2">
            <p>Loading</p>
            <Loader color="orange" size="sm" />
          </div>
        </div>
      )}
      {!isQuoteLogLoading && (!quoteLog || isQuoteLogError) && (
        <div className="h-44 px-6 py-3 flex justify-center items-center text-xl bg-white rounded-xl">
          <p className="text-center">
            Looks like some problem with quote history occurs
            <br />
            Please, try again later
          </p>
        </div>
      )}
      {renderQuoteChanges()}

      <Modal
        opened={opened}
        title={<h2 className="text-2xl font-semibold">Edit deliverables</h2>}
        size="md"
        centered
        onClose={close}
      >
        <Modal.Body>
          {selectedQuoteItem && (
            <QuotePlacementPostTypesForm
              deliverablesAmount={deliverablesAmount}
              deliverables={{ ...selectedQuoteItem }}
              onSubmit={(deliverables) =>
                handleUpdateDeliverablesFormSubmit(selectedQuoteItem.id, deliverables)
              }
              onCancel={close}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
