"use client";

import { Tab, Tabs } from "@nextui-org/react";
import ChangeSiteName from "./ChangeSiteName";
import ChangeSiteDescription from "./ChangeSiteDescription";
import DeleteSite from "./DeleteSite";
import ChangeSiteSubdomain from "./ChangeSiteSubdomain";

interface IProps {
  data: any;
  id: string;
}

const TabsSection = ({ data, id }: IProps) => {
  return (
    <Tabs
      variant="light"
      color="secondary"
      className="w-full border-b px-1 py-3"
    >
      <Tab key="general" title="General">
        <div className="space-y-8">
          <ChangeSiteName name={data.name as string} id={id} />
          <ChangeSiteDescription
            description={data.description as string}
            id={id}
          />
          <DeleteSite subdomain={data.subdomain as string} id={id} />
        </div>
      </Tab>
      <Tab key="domains" title="Domains">
        <ChangeSiteSubdomain subdomain={data.subdomain as string} id={id} />
      </Tab>
      <Tab key="appearance" title="Appearance">
        WIP appearance
      </Tab>
    </Tabs>
  );
};

export default TabsSection;
