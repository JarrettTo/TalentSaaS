
import { Tabs } from "@mantine/core";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { DiscoveryInfluncersPage } from "./discovery/influencers.page";
import { DiscoverySoundsPage } from "./discovery/sounds.page";
import { DiscoveryHashtagsPage } from "./discovery/hashtags.page";
import { DiscoverySavedPage } from "./discovery/saved.page";
enum TabTypesEnum {
  DiscoveryInfluencers = "discovery-influencers",
  DiscoverySounds = "discovery-sounds",
  DiscoveryHashtags = "discovery-hashtags",
  DiscoverySaved = "discovery-saved",
}
const tabLinkClasses =
  "bg-transparent border-0 p-0 text-black text-lg cursor-pointer underline-offset-8 transition-all decoration-orange hover:text-orange";

export const DiscoveryPage = () => {
  const [activeTab, setActiveTab] = useState<TabTypesEnum>(TabTypesEnum.DiscoveryInfluencers);

  return (
    <Tabs
      value={activeTab}
      onTabChange={(tabValue) => setActiveTab(tabValue as TabTypesEnum)}
      defaultValue={TabTypesEnum.DiscoveryInfluencers}
      color="orange"
      unstyled
    >
      <Tabs.List className="flex space-x-3 mt-8 w-fit items-center">
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.DiscoveryInfluencers && "underline"
          )}
          value={TabTypesEnum.DiscoveryInfluencers}
        >
          Discover Influencers
        </Tabs.Tab>
        <span>|</span>
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.DiscoverySounds && "underline"
          )}
          value={TabTypesEnum.DiscoverySounds}
        >
          Discover Sounds
        </Tabs.Tab>
        <span>|</span>
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.DiscoveryHashtags && "underline"
          )}
          value={TabTypesEnum.DiscoveryHashtags}
        >
          Discover Hashtags
        </Tabs.Tab>
        <Tabs.Tab
          className={clsx(
            tabLinkClasses,
            activeTab === TabTypesEnum.DiscoverySaved && "underline"
          )}
          value={TabTypesEnum.DiscoverySaved}
        >
          Saved Media
        </Tabs.Tab>
      </Tabs.List>
      
      <div className="mt-14">
        <Tabs.Panel value={TabTypesEnum.DiscoveryInfluencers}>
          <DiscoveryInfluncersPage />
        </Tabs.Panel>

        <Tabs.Panel value={TabTypesEnum.DiscoveryHashtags}>
          <DiscoveryHashtagsPage />
        </Tabs.Panel>

        <Tabs.Panel value={TabTypesEnum.DiscoverySounds}>
          <DiscoverySoundsPage />
        </Tabs.Panel>
        <Tabs.Panel value={TabTypesEnum.DiscoverySaved}>
          <DiscoverySavedPage />
        </Tabs.Panel>
      </div>
    </Tabs>
  );
};