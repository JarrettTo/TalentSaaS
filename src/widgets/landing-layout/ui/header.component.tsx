import {Link} from "react-router-dom";

export const Header = () => {

  return (
    <header className="flex items-center justify-between pl-[8.63rem] pr-[6.72rem] pt-[2.56rem]">
      <h1 className="text-[6.25rem] font-bold">Jnr.</h1>
      <Link to="/login" className="w-[14.53363rem] h-[3.9375rem] bg-orange text-landing-basic text-black no-underline items-center flex justify-center rounded-[6.25rem] font-bold">
        Login
      </Link>
    </header>
  );
};