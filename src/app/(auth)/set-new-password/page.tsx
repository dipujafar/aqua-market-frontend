import PageTopSection from "@/components/shared/PageTopSection";
import React from "react";
import SetNewPasswordForm from "./components/SetNewPasswordForm";
const SetNewPasswordPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Set New Password"></PageTopSection>
      <div className="md:pb-16 pb-8">
        <SetNewPasswordForm></SetNewPasswordForm>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;
