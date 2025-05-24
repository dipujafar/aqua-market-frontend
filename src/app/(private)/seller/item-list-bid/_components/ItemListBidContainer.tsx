import BidFishInventoryList from "./BidFishInventoryList";
import AddNewBidProductSection from "./AddNewBidProductSection";

const ItemListBidContainer = () => {
  return (
    <div className="xl:space-y-12 md:space-y-8 space-y-6">
      <AddNewBidProductSection />
      <BidFishInventoryList />
    </div>
  );
};

export default ItemListBidContainer;
