import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import ClientWrapperV2 from "@/components/watch-together/room/ClientWrapperV2";
import { Suspense } from "react";

const Page = async ({ params }: PageProps) => {
  const { roomId } = await params;

  if (!roomId) return <NotFound />;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <ClientWrapperV2 roomId={roomId as string} />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
