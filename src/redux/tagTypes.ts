export const tagTypes = {
  auth: "auth",
  profile: "profile",
  user: "user",
  getUser: "getUser",
  orders: "orders",
  fish: "fish",
  admin: "admin",
} as const;

export const tagTypesList = [
  tagTypes.auth,
  tagTypes.profile,
  tagTypes.user,
  tagTypes.getUser,
  tagTypes.orders,
  tagTypes.fish,
  tagTypes.admin,
];
