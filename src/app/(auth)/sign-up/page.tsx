import PageTopSection from "@/components/shared/PageTopSection";
import SignUpContainer from "./components/SignUpContainer";




export const metadata = {
  title: "Sign In",
  description: "Sign In to your account and enjoy shopping",
};

const SignInPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Choose Your User Role"></PageTopSection>
     <SignUpContainer></SignUpContainer>
    </div>
  );
};

export default SignInPage;
