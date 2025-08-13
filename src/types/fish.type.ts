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

export interface IFish {
  id: string;
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
  sellerId: string;
  isActive?: boolean;
  isDeleted?: boolean;
  status: "sold" | "ongoing" | "processing" | "delivered";
  advertise?: IAdvertise;
  bids: IPBids[];
}
