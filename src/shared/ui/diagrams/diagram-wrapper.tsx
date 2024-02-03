import React, { FC, PropsWithChildren } from "react";

interface DiagramWrapperProps {
  className?: string;
}

const DiagramWrapper: FC<PropsWithChildren<DiagramWrapperProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      <div className="w-60 h-60">{children}</div>
    </div>
  );
};

export default DiagramWrapper;
