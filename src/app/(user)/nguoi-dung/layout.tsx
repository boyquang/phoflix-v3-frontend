import AnimateWrapper from "@/components/shared/AnimateWrapper";
import SideBar from "@/components/user/SideBar";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimateWrapper>
      <Box className="max-w-[1620px] mx-auto 2xl:px-12 px-4 lg:py-32 py-24 min-h-[calc(100vh-360px)]">
        <Box className="flex gap-12 lg:flex-row flex-col">
          <SideBar />
          <Box className="flex-1">{children}</Box>
        </Box>
      </Box>
    </AnimateWrapper>
  );
};

export default Layout;
