import React, { FC, PropsWithChildren } from "react";

interface DiagramWrapperProps {
  className?: string;
}

const PercentageWrapper: FC<PropsWithChildren<DiagramWrapperProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex justify-start ${className ?? ""}`}>
      <div className="w-full h-60">{children}</div>
    </div>
  );
};

export default PercentageWrapper;
