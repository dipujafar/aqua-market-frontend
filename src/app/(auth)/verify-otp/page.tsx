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
      <div className="md:pb-16 pb-8">
        <VerifyOtpForm></VerifyOtpForm>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
