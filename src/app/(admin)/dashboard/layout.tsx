import SideBar from "@/components/admin/SideBar";
import { Box } from "@chakra-ui/react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex bg-[#1e1f2b] min-h-screen">
      <SideBar />
      <Box className="flex-1 lg:p-8 md:p-6 p-4 sm:ml-64 overflow-x-auto sm:pt-0 pt-24">
        {children}
      </Box>
    </Box>
  );
};

export default RootLayout;
