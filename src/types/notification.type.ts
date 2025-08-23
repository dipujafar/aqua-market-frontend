export type UINotification = {
  _id: string;
  message?: string;
  link?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isRead?: boolean;
  data?: {
    id?: string;
    message?: string;
    link?: string | null;
  };
};