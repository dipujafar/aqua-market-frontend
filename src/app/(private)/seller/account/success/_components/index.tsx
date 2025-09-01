"use client";

import CommonButton from "@/components/ui/common-button";
import { CheckCircleIcon } from "lucide-react";

interface ConnectSuccessProps {
  stripeAccountId: string;
  userId: string;
}

const ConnectSuccess = ({ stripeAccountId, userId }: ConnectSuccessProps) => {
  return (
    <>
      {" "}
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-900 to-purple-800">
        <div className="max-w-md w-full mx-auto bg-white shadow-xl rounded-lg p-8 space-y-6">
          {/* Header Section */}
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Account Connected
            </h2>
          </div>

          {/* Content Section */}
          <div className="text-gray-700 space-y-4">
            <p>
              Your Stripe account has been successfully connected! You can now
              start processing payments.
            </p>
            <p className="text-sm text-gray-500">
              User ID: <span className="font-semibold">{userId}</span>
            </p>
            <p className="text-sm text-gray-500">
              Stripe Account ID:{" "}
              <span className="font-semibold">{stripeAccountId}</span>
            </p>
          </div>

          {/* Button Section */}
          <div className="flex justify-center mt-6">
            <CommonButton
              className="w-full py-3"
              handlerFunction={() =>
                (window.location.href = "/seller/profile/seller-profile")
              }
            >
              Go to Dashboard
            </CommonButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectSuccess;
