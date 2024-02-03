import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavLinkClass =
  "text-black w-fit underline-offset-8 hover:text-orange transition-all decoration-orange";

export const EstimatorHead = () => {
  const [estimatorTool, setEstimatorTool] = useState<boolean>(false);
  const location = useLocation().pathname.replace(/^\/|\/$/g, "");

  useEffect(() => {
    if (location === "estimator") {
      setEstimatorTool(true);
    } else {
      setEstimatorTool(false);
    }
  }, [location]);

  return (
    <div className="flex space-x-3 text-lg text-black">
      <NavLink
        to={`/app/estimator/tool`}
        className={clsx(NavLinkClass, estimatorTool ? "underline" : "no-underline")}
      >
        Estimator Tool
      </NavLink>
      <span>|</span>
      <NavLink className={clsx(NavLinkClass, "no-underline")} to={`/app/estimator/rates`}>
        Rates
      </NavLink>
      <span>|</span>
      <NavLink
        className={clsx(NavLinkClass, "no-underline")}
        to={`/app/estimator/campaign`}
      >
        Estimator Campaign
      </NavLink>
    </div>
  );
};
