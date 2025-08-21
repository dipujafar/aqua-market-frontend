import CommonButton from "@/components/ui/common-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IOrderItem } from "@/types/order.types";
import Image from "next/image";

interface ViewOrderItemProps {
  items: IOrderItem[];
}

const ViewOrderItem = ({ items }: ViewOrderItemProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <CommonButton className=" flex items-center gap-1">
            <span className=" text-sm">See Items</span>
          </CommonButton>
        </DialogTrigger>
        <DialogContent className="border-none shadow-none bg-[#2A475A]">
          <div className="space-y-4">
            {items?.length > 0 ? (
              items.map((item: IOrderItem) => (
                <div
                  key={item._id}
                  className="flex text-white items-center gap-4 rounded-2xl border-[#2D1445] p-4 shadow-sm hover:shadow-md transition bg-[#2D1445]/5 "
                >
                  {/* Product Image */}
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.fishId?.fishName || "Fish"}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.fishId?.fishName}
                    </h3>
                    <p className="text-sm">Style: {item.style}</p>
                    <p className="text-sm">
                      Seller:{" "}
                      <span className="font-medium">{item.sellerName}</span>
                    </p>
                  </div>

                  {/* Price & Quantity */}
                  <div className="text-right">
                    <p className="font-semibold text-base">
                      ${item.price} × {item.quantity}
                    </p>
                    <p className="text-sm ">
                      Total:{" "}
                      <span className="font-semibold">
                        ${item.price * item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className=" text-center">No items found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewOrderItem;
