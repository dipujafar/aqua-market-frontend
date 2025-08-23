"use client";

import { CheckCircle, ArrowLeft, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const [transactionId] = useState(
    `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  );

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      toast.success("Transaction ID copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy the Transaction ID.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#2E1345] to-[#0A2943] text-white shadow-md border-[#1C2C3D]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-400">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-white">
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
            <div className="bg-[#1C2C3D] p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Transaction ID</p>
              <div className="flex items-center justify-center">
                <p className="text-xs text-green-400 font-mono">
                  {transactionId}
                </p>
                <Button
                  variant="ghost"
                  onClick={handleCopyClick}
                  className="text-teal-200 cursor-pointer hover:bg-transparent hover:text-teal-400"
                  aria-label="Copy Transaction ID"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* <Button asChild className="w-full cursor-pointer py-6">
              <Link href="/dashboard">
                <Download className="mr-2 h-4 w-4 text-teal-200" />
                Access Your Purchase
              </Link>
            </Button> */}

            <Button
              variant="outline"
              asChild
              className="w-full bg-transparent text-teal-200 border-teal-200 cursor-pointer py-6 hover:bg-[#1C2C3D] hover:border-none hover:text-slate-100"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 text-teal-200" />
                Return to Home
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-300">
              A confirmation email has been sent to your registered email
              address.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
