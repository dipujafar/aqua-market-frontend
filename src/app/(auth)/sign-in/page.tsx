import PageTopSection from "@/components/shared/PageTopSection";
import SIgnInForm from "./components/SIgnInForm";

export const metadata = {
  title: "Sign In",
  description: "Sign In to your account and enjoy shopping",
};

const SignInPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Welcome back! Sign in to continue "></PageTopSection>
      <div className="md:pb-16 pb-8">
        <SIgnInForm></SIgnInForm>
      </div>
    </div>
  );
};

export default SignInPage;
