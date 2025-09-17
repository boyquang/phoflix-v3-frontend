"use client";

import AddNewButton from "@/components/shared/AddNewButton";

import dynamic from "next/dynamic";

const MovieActionsDialog = dynamic(() => import("./MovieActionsDialog"), {
  ssr: false,
});
const CrawlStatusBox = dynamic(() => import("./CrawlStatusBox"), {
  ssr: false,
});
const LogInfo = dynamic(() => import("./LogInfo"), { ssr: false });

const ClientWrapper = () => {
  return (
    <div className="text-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-3xl text-xl">Quản lý phim</h1>
        <MovieActionsDialog
          action="create"
          trigger={<AddNewButton label="Thêm phim" size="sm" />}
        />
      </div>
      <CrawlStatusBox />
      <LogInfo />
    </div>
  );
};

export default ClientWrapper;
