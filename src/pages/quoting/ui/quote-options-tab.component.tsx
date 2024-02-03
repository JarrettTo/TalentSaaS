import { IQuotePlacement, useQuotePlacementsStore } from "@entities/quote";
import { CreateQuoteForm } from "@features/create-quote-form";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { QuoteOptionsRow } from "./quote-options-row.component";
import { QuotePlacementPostTypesForm } from "@features/quote-placement-post-types-form";
import { toast } from "react-toastify";
import { IDeliverables } from "@shared/lib/types";

const cellClasses = "py-6 px-6";

enum ModalTypesEnum {
  SaveQuote,
  UpdateDeliverables,
}

export const QuoteOptionsTab = () => {
  const quotePlacements = useQuotePlacementsStore((store) => store.quotePlacements);
  const setQuotePlacements = useQuotePlacementsStore((store) => store.setQuotePlacements);
  const [opened, { open, close }] = useDisclosure(false);

  const [filledQuotePlacements, setFilledQuotePlacements] = useState<IQuotePlacement[]>(
    []
  );
  const [selectedQuotePlacement, setSelectedQuotePlacement] =
    useState<IQuotePlacement | null>(null);
  const [modalType, setModalType] = useState<ModalTypesEnum | null>(null);

  useEffect(() => {
    if (quotePlacements.length === 0) {
      setFilledQuotePlacements([]);
      return;
    }
    const filteredQuotePlacements = quotePlacements.filter((quotePlacement) => {
      return quotePlacement.deliverables > 0;
    });
    setFilledQuotePlacements(filteredQuotePlacements);
  }, [quotePlacements]);

  const handleSaveQuoteClick = () => {
    setModalType(ModalTypesEnum.SaveQuote);
    open();
  };

  const handleDeliverablesEdit = (quotePlacement: IQuotePlacement) => {
    setSelectedQuotePlacement(quotePlacement);
    setModalType(ModalTypesEnum.UpdateDeliverables);
    open();
  };

  const handleUpdateDeliverablesFormSubmit = (
    quotePlacementId: number,
    deliverables: IDeliverables
  ) => {
    const updatedQuotePlacements = quotePlacements.map((quotePlacement) => {
      if (quotePlacement.id === quotePlacementId) {
        return { ...quotePlacement, ...deliverables };
      }
      return quotePlacement;
    });
    setQuotePlacements(updatedQuotePlacements);
    close();
  };

  const handleCreateQuoteFormSubmit = () => {
    const updatedQuotePlacements = quotePlacements.map((quotePlacement) => ({
      ...quotePlacement,
      deliverables: 0,
      isCrossPost: false,
    }));
    setQuotePlacements(updatedQuotePlacements);
    close();
    toast.success("Quote was successfully saved");
  };

  if (filledQuotePlacements.length === 0) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>First fill in the data about the influencers</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button color="dark" radius="lg" size="md" onClick={handleSaveQuoteClick}>
          Save quote
        </Button>
      </div>
      <div className="bg-white text-xl rounded-2xl mt-10 shadow-xl">
        <div className="grid grid-cols-[1fr,1fr,2fr,1fr] border-0 border-b border-solid">
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
            <p>Total Fee inc AST (ex GST)</p>
          </div>
        </div>
        {filledQuotePlacements.map((item) => (
          <QuoteOptionsRow
            key={item.id}
            quotePlacement={item}
            onDeliverablesEdit={handleDeliverablesEdit}
          />
        ))}
      </div>

      <Modal
        opened={opened && modalType === ModalTypesEnum.SaveQuote}
        title={<h2 className="text-2xl font-semibold">Save quote</h2>}
        size="md"
        centered
        onClose={close}
      >
        <Modal.Body>
          <CreateQuoteForm onSubmit={handleCreateQuoteFormSubmit} onCancel={close} />
        </Modal.Body>
      </Modal>

      <Modal
        opened={opened && modalType === ModalTypesEnum.UpdateDeliverables}
        title={<h2 className="text-2xl font-semibold">Edit deliverables</h2>}
        size="md"
        centered
        onClose={close}
      >
        <Modal.Body>
          {selectedQuotePlacement && (
            <QuotePlacementPostTypesForm
              deliverablesAmount={selectedQuotePlacement.deliverables}
              deliverables={{ ...selectedQuotePlacement }}
              onSubmit={(deliverables) =>
                handleUpdateDeliverablesFormSubmit(
                  selectedQuotePlacement.id,
                  deliverables
                )
              }
              onCancel={close}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
