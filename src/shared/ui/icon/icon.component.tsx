import React, { Suspense, SVGAttributes } from "react";
import FilterArrow from "./filter-arrow";

const ICONS_MAP = {
  filterArrow: FilterArrow,
} as const;

export type IconsTypes = keyof typeof ICONS_MAP;

export interface IIconComponentProperties extends SVGAttributes<SVGElement> {
  name: IconsTypes;
}

export const IconComponent = ({ name, ...props }: IIconComponentProperties) => {
  const Icon = ICONS_MAP[name];

  return (
    <Suspense fallback={null}>{Icon ? <Icon role="img" {...props} /> : null}</Suspense>
  );
};
