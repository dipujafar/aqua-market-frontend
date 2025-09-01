export const tagTypes = {
  auth: "auth",
  profile: "profile",
  user: "user",
  getUser: "getUser",
  orders: "orders",
  fish: "fish",
  admin: "admin",
  bids: "bids",
  seller: "seller",
  advertise: "advertise",
  payment: "payment",
} as const;

export const tagTypesList = [
  tagTypes.auth,
  tagTypes.profile,
  tagTypes.user,
  tagTypes.getUser,
  tagTypes.orders,
  tagTypes.fish,
  tagTypes.admin,
  tagTypes.bids,
  tagTypes.seller,
  tagTypes.advertise,
  tagTypes.payment,
];
