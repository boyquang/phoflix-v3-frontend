type NotificationSlice = {
  data: {
    conmunity: any[];
    individual: any[];
  };
  activeTab: "community" | "individual";
  loading: boolean;
  openNotification: boolean;
  error: boolean;
  newNotification: boolean;
};

type GetNotifications = {
  limit: number;
  type: "community" | "individual";
  userId?: string | null;
  afterTime?: number | null;
};

type CreateNotification = {
  senderId: string;
  type: "community" | "individual";
  content: string;
  accessToken: string;
  userId?: string| null;
  href?: string| null;
  image?: string| null;
};

type NotificationCustom = {
  id: string;
  user_id: string | null;
  content: string;
  created_at: string | number;
  image: string | null;
  href: string | null;
  sender_name: string;
  sender_id: string;
};

type NotificationsProps = {
  notifications: NotificationCustom[];
  loading?: boolean;
};

// ============================= SERVER =============================
type GetNotificationsServer = {
  limit: number;
  page: number;
  accessToken: string;
};

type DeleteNotificationServer = {
  notificationId: string;
  userId: string;
  accessToken: string;
};

type UpdateNotificationServer = {
  notificationId: string;
  userId: string;
  content: string;
  href: string;
  image: string;
  accessToken: string;
};

type CreateNotificationServer = {
  senderId: string;
  type: "community";
  content: string;
  accessToken: string;
  href?: string;
  image?: string;
};

type NotificationTable = {
  content: string;
  created_at: string;
  href: string;
  id: string;
  image: null | string;
  sender_name: string;
};
