import { auth } from "@/auth";
import { getListRooms } from "./watching-together-server.action";

export const getRoomsList = async () => {
  const sesstion = await auth();

  if (!sesstion?.user?.accessToken) {
    return [];
  }

  const response = await getListRooms({
    page: 1,
    limit: 15,
    accessToken: sesstion?.user?.accessToken,
  });

  return response?.result?.rooms || [];
};
