export const tagTypes = {
  auth: "auth",
  profile: "profile",
  user: "user",
  getUser: "getUser",
  orders: "orders",
} as const;

export const tagTypesList = [
  tagTypes.auth,
  tagTypes.profile,
  tagTypes.user,
  tagTypes.getUser,
  tagTypes.orders,
];