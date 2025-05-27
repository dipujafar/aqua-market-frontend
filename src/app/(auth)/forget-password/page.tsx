import PageTopSection from "@/components/shared/PageTopSection";
import ForgetPassForm from "./components/ForgetPassForm";

const ForgetPasswordPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Forgot Password"></PageTopSection>
      <div className="md:pb-16 pb-8">
        <ForgetPassForm></ForgetPassForm>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
