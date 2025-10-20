import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import ClientWrapper from "@/components/watch-together/room-v2/ClientWrapper";
import { buildWatchTogetherMetadataByRoomId } from "@/lib/seo";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { roomId = "" } = await params;
  return await buildWatchTogetherMetadataByRoomId(roomId as string);
}

const Page = async ({ params }: PageProps) => {
  const { roomId = "" } = await params;

  if (!roomId) return <NotFound />;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <ClientWrapper roomId={roomId as string} />
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
