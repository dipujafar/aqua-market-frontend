export const productCardButtonColor = (type: string) => {
    switch (type) {
      case "preOrder":
        return "#0B1E70";
      case "bid":
        return "#4DA8DA";
      case "directBuy":
        return "#78C0A8";
      default:
        return "#000";
    }
  };
  