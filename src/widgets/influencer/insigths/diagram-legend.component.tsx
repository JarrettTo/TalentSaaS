import React, { FC } from "react";

interface InfluencerDiagramLegendElemProps {
  label: string;
  color?: string;
  value?: number;
}

const InfluencerDiagramLegendElem: FC<
  InfluencerDiagramLegendElemProps
> = ({ label, color, value }) => {
  return (
    <div className="flex items-center">
      <span
        className="w-4 h-4 mr-4"
        style={{
          backgroundColor: color,
        }}
      ></span>
      <span>
        {label} {value ? `(${value})` : ""}
      </span>
    </div>
  );
};

export default InfluencerDiagramLegendElem;
