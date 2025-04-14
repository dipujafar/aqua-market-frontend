
import PageTopSection from "@/components/shared/PageTopSection";
import VerifyOtpForm from "./components/VerifyOtpForm";

export const metadata = {
  title: "Verify OTP",
  description: "Verify your account",
};

const VerifyOtpPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Verify Your Password"></PageTopSection>
      <VerifyOtpForm></VerifyOtpForm>
    </div>
  );
};

export default VerifyOtpPage;
