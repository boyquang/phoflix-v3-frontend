interface LoadingProps {
  height?:
    | "h-screen"
    | "h-1/2"
    | "h-1/3"
    | "h-1/4"
    | "h-1/5"
    | "h-1/6"
    | string;
  type?: "text" | "spin" | "bars";
}

const Loading = ({ height = "h-screen", type = "bars" }: LoadingProps) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      {type === "spin" ? (
        <div className="border-[#ffd875] border-[3px] border-b-transparent h-10 w-10 rounded-full animate-spin"></div>
      ) : type === "bars" ? (
        <div className="bars-loading"></div>
      ) : (
        <div className="flex flex-col text-gradient lg:text-4xl text-3xl font-semibold logo-load">
          PHOFLIX-V3
          <span className="text-xs text-gray-400 text-center">by phohoccode</span>
        </div>
      )}
    </div>
  );
};

export default Loading;
