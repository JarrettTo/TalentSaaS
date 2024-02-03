import { Tabs, clsx } from "@mantine/core";
import { useState } from "react";
import { QuoteOptionsTab, SavedQuotesTab, QuoteCalculationTab } from "./ui";

const tabLinkClasses =
  "bg-transparent border-0 p-0 text-black text-lg cursor-pointer underline-offset-8 transition-all decoration-orange hover:text-orange";

enum TabTypesEnum {
  QuoteCalculation = "quote-calculation",
  QuoteOptions = "quote-options",
  SavedQuotes = "saved-quotes",
}

export const QuotingPage = () => {
  const [activeTab, setActiveTab] = useState<TabTypesEnum>(TabTypesEnum.QuoteCalculation);

  return (
    <Tabs
      value={activeTab}
      onTabChange={(tabValue) => setActiveTab(tabValue as TabTypesEnum)}
      defaultValue={TabTypesEnum.QuoteCalculation}
      color="orange"
      unstyled
    >
      <Tabs.List className="flex space-x-3 mt-8 w-fit items-center">
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.QuoteCalculation && "underline"
          )}
          value={TabTypesEnum.QuoteCalculation}
        >
          Quote calculation
        </Tabs.Tab>
        <span>|</span>
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.QuoteOptions && "underline"
          )}
          value={TabTypesEnum.QuoteOptions}
        >
          Quote Options
        </Tabs.Tab>
        <span>|</span>
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.SavedQuotes && "underline"
          )}
          value={TabTypesEnum.SavedQuotes}
        >
          Saved Quotes
        </Tabs.Tab>
      </Tabs.List>

      <div className="mt-14">
        <Tabs.Panel value={TabTypesEnum.QuoteCalculation}>
          <QuoteCalculationTab />
        </Tabs.Panel>

        <Tabs.Panel value={TabTypesEnum.QuoteOptions}>
          <QuoteOptionsTab />
        </Tabs.Panel>

        <Tabs.Panel value={TabTypesEnum.SavedQuotes}>
          <SavedQuotesTab />
        </Tabs.Panel>
      </div>
    </Tabs>
  );
};
