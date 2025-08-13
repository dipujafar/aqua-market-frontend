export const productCardButtonColor = (pricingType: string) => {
    switch (pricingType) {
      case "preOrder":
        return "#0B1E70";
      case "forBids":
        return "#4DA8DA";
      case "directSale":
        return "#78C0A8";
      default:
        return "#000";
    }
  };
  