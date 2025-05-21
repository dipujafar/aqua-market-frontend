export const findStatusColor = (color: string) => {
  switch (color) {
    case "pending":
      return "#FFD700";
    case "delivered":
      return "#78C0A8";
    case "in_progress":
      return "#A78BFA";
    case "on_the_why":
      return "#60A5FA;";
    case "rejected":
      return "#F87171";
    default:
      return "#9CA3AF";
  }
};
