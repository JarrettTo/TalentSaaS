import { NavLink } from "react-router-dom";

const NavLinkClass =
  "mb-6 text-2xl text-black w-fit underline-offset-8 no-underline hover:text-orange";

export const Sidebar = () => {
  return (
    <div className="bg-white w-[14rem] fixed h-screen">
      <div className="h-full py-10 px-10 xxl:py-16">
        <div className="flex items-center relative h-full">
          <div className="absolute top-0 left-0 text-7xl">Jnr.</div>
          <div className="flex flex-col w-full">
            <NavLink className={NavLinkClass} to={"/app/roster"}>
              Talent
            </NavLink>
            <div className="flex flex-col w-full ml-8">
              <NavLink className={NavLinkClass} to={"/app/"}>
                Group Insights
              </NavLink>
              <NavLink className={NavLinkClass} to={"/app/rates"}>
                Rates
              </NavLink>
              <NavLink className={NavLinkClass} to={"/app/quoting"}>
                Quoting
              </NavLink>
              <NavLink className={NavLinkClass} to={"/app/estimator"}>
                Estimator
              </NavLink>
              <NavLink className={NavLinkClass} to={"/app/discovery"}>
                Discovery
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
