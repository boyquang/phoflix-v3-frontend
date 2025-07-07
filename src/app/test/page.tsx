import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";

const Page = async () => {
  const response = await fetch(`${NEXT_PUBLIC_SITE_URL}/api/test`, {
    cache: "no-store",
  });

  const data = await response.json();

  console.log("Response:", data);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-2xl">
      Hello world!
    </div>
  );
};

export default Page;
