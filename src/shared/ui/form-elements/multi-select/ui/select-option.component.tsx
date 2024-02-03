import { forwardRef } from "react";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  id: string;
  label: string;
}

export const MultiSelectOptionComponent = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, label, ...others }: ItemProps, ref) => {
    return (
      <div className="relative">
        <div ref={ref} {...others}>
          {label}
        </div>
      </div>
    );
  }
);
