import PageTopSection from "@/components/shared/PageTopSection";
import React from "react";
import SetNewPasswordForm from "./components/SetNewPasswordForm";
const SetNewPasswordPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Set New Password"></PageTopSection>
      <SetNewPasswordForm></SetNewPasswordForm>
    </div>
  );
};

export default SetNewPasswordPage;
