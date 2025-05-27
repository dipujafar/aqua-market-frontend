import PageTopSection from "@/components/shared/PageTopSection";
import React from "react";
import ChooseUserRoleContainer from "./components/ChooseUserRoleContainer";

const ChooseUserRole = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Choose Your User Role"></PageTopSection>
      <div className="md:pb-16 pb-8">
        <ChooseUserRoleContainer></ChooseUserRoleContainer>
      </div>
    </div>
  );
};

export default ChooseUserRole;
