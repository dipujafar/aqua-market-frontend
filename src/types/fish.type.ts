export interface IPricingInfo {
  style: string;
  quantity: number;
  price: number;
  discount?: number;
  startingBid?: number;
  date?: Date;
  time?: string;
  estimateAvailability?: string;
}

export interface IAdvertise {
  offerTitle?: string;
  offerDiscount?: number;
  date?: Date;
  time?: string;
  isActive?: boolean;
}

export type TBidStatus =
  | "ongoing"
  | "canceled"
  | "completed"
  | "lost"
  | "own"
  | "outbid"
  | "active";
export interface IPBids {
  userId?: string;
  bidAmount?: number;
  agreeForShipping?: boolean;
  isActive?: boolean;
  status: TBidStatus;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
  BUYER = "buyer",
  SELLER = "seller",
}
export type TUserGender = "male" | "female" | "other";

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  shippingMethod: string;
  isDefault?: boolean;
  isActive?: boolean;
}
export interface IUser {
  _id?: string;
  first_name: string;
  last_name?: string;
  user_name?: string;
  gender?: TUserGender;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
    address: string;
  };
  country?: string;
  streetAddress?: string;
  zipCode?: string;
  city?: string;
  state?: string;

  contact_number?: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  profile_image?: string;
  banner?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;
  verification?: {
    otp: string | number;
    expiresAt: Date;
    status: boolean;
  };
  about?: string;
  store_name?: string;
  isNotificationOn?: boolean;
  shippingAddress?: IShippingAddress;
}

export interface IFish {
  _id?: string;
  id?: string;
  fishName: string;
  commonName: string;
  image: string[];
  video?: string[];
  size: string;
  careLevel: string;
  tankRequirements: string;
  foodRequirements: string;
  behavior: string;
  description: string;
  paymentSystem: string;
  pricingType: "directSale" | "forBids" | "preOrder";
  pricingInfo: IPricingInfo;
  shippingAddress: string;
  doaPolicy: string;
  sellerId: ISeller;
  isActive?: boolean;
  isDeleted?: boolean;
  status: "sold" | "ongoing" | "processing" | "delivered";
  advertise?: IAdvertise;
  bids: IPBids[];
}

export interface IFishReview {
  [x: string]: any;
  _id?: string;
  data: any;
  userId?: IUser;
  fishId: IFish;
  rating: number;
  comment: string;
  image?: string[];
  createdAt?: Date;
}

interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  [key: number]: number;
}
export interface IFishAverageRating {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
}

export interface IBuyFish {
  _id?: string;
  userId: IUser;
  fishId: IFish;
  sellerId: IUser;
  quantity: number;
  status?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISeller {
  _id?: string;
  about: string;
  banner: string;
  contact_number: string;
  createdAt: string;
  email: string;
  first_name: string;
  gender: "male" | "female" | "other";
  isActive: boolean;
  isDeleted: boolean;
  isNotificationOn: boolean;
  isVerified: boolean;
  last_name: string;
  location: string;
  profile_image: string;
  role: "seller" | "buyer" | "admin";
  updatedAt: string; //
  user_name: string;
}
