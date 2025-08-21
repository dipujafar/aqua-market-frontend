import { IFish, IUser } from "./fish.type";

export interface IOrderItem {
  _id?: string;
  fishId: IFish;
  image: string;
  price: number;
  quantity: number;
  sellerName: string;
  sellerId: IUser;
  stock: number;
  style: string;
}

export interface IOrder {
  _id?: string;
  userId: IUser;
  userEmail: string;
  items: IOrderItem[];
  totalPrice?: number;
  status?: "pending" | "completed" | "canceled";
  createdAt?: Date;
  updatedAt?: Date;
}
