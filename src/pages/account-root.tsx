import { useAuth } from "@shared/lib/utils";
import { Header } from "@widgets/header";
import { Sidebar } from "@widgets/sidebar/sidebar.component";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const AccountRoot = () => {
  const { checkUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-purple flex">
      <Sidebar />
      <div className="ml-[16rem] w-[calc(100vw_-_16rem)] my-10 xxl:my-16 pl-14 pr-10">
        <Header />
        <div className="max-w-7xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
