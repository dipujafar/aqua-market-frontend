import { ReactNode } from "react";
import SellerPagesTopSection from "./_components/SellerPagesTopSection";

const UserTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="xl:space-y-16 space-y-8">
      <SellerPagesTopSection />
      {children}
    </div>
  );
};

export default UserTemplate;
