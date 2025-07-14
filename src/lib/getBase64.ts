import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (item: string) => {
  try {
    const res = await fetch(item);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    console.log("Error fetching base64 image:", error);
    return null;
  }
};
