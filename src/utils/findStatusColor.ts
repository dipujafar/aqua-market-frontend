export const findStatusColor = (color: string) => {
  switch (color) {
    case "pending":
      return "#FFD700";
    case "completed":
      return "#78C0A8";
    case "canceled":
      return "#F87171";
  }
};
