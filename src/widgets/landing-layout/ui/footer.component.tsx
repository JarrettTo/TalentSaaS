import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center mt-[17.75rem] pb-[4.13rem]">
      <h1 className="text-[6.25rem] font-bold">Jnr.</h1>
      <div className="h-[0.3125rem] w-[90%] bg-black" />
      <p className="text-landing-basic mt-[2.06rem]">&copy; {year} Neuralle</p>
      <div className="flex flex-col text-center mt-4">
        <Link
          className="text-black underline-offset-4"
          to="/privacy-policy"
          target="_blank"
        >
          Privacy policy
        </Link>
        <Link
          className="mt-2 text-black underline-offset-4"
          to="/terms-of-service"
          target="_blank"
        >
          Terms of Services
        </Link>
      </div>
    </footer>
  );
};
