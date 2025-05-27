import { Suspense } from "react";
import SignUpForm from "./components/SignUpForm";
export const metadata = {
  title: "Sign Up",
  description: "Create your account and enjoy shopping",
};

const SignInPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="md:pb-16 pb-8">
        <SignUpForm></SignUpForm>
      </div>
    </Suspense>
  );
};

export default SignInPage;
