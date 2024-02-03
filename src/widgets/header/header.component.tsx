import { useAuth } from "@shared/lib/utils";
import userLogo from "/assets/images/avatar.png";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-end items-center mb-10 xxl:mb-16 mr-14">
      <div className="flex items-center">
        <div className="text-xl mr-4">Welcome back!</div>
        <div className="relative group">
          <div className="relative z-20 overflow-hidden cursor-pointer">
            <div className="bg-white w-16 h-16 rounded-full">
              <img className="w-full h-full rounded-full" src={userLogo} alt="" />
            </div>
            {/* <img className="w-full h-full rounded-full" src={userLogo} alt="" /> */}
          </div>
          <div className="absolute top-12 -left-3 z-10 min-w-[10rem] bg-white pointer-events-none flex flex-col pt-6 px-4 pb-4 rounded-2xl shadow-2xl transition-all opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto">
            {/* <span className="text-2xl font-bold">Account</span> */}
            <div onClick={logout} className="cursor-pointer text-xl hover:text-orange">
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
