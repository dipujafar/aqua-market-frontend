"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CommonButton from "@/components/ui/common-button";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

// ✅ Define form validation schema using Zod
const formSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

const VerifyOtpForm = () => {
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submitted Data:", data);

    try {
      const res = await verifyOtp(data).unwrap();
      console.log("res______", res);

      if (res.data.accessToken) {
        toast.success("OTP verified successfully! Please login.");
        dispatch(
          setUser({
            token: res?.data?.accessToken,
          })
        );
        // router.push("/set-new-password");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log("error______", error);
    }
  };

  return (
    <Card
      className="max-w-[742px] w-fit mx-auto shadow-none border-none lg:px-16 lg:py-10 text-white"
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.22) 0%, rgba(120, 192, 168, 0.22) 85.08%)",
        boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)",
      }}
    >
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-6 space-y-4"
          >
            {/* OTP Input Field */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      className="border"
                    >
                      <InputOTPGroup className="gap-x-2 ">
                        {Array(6)
                          .fill(null)
                          .map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="border lg:size-14 text-white bg-transparent"
                            />
                          ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CommonButton className="w-full">Verify Code</CommonButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyOtpForm;
