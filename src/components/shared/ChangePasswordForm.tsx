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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import CommonButton from "@/components/ui/common-button";
import { useChangePasswordMutation } from "@/redux/api/userProfileApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";

const formSchema = z.object({
  current_password: z
    .string({ required_error: "Current Password is required" })
    .min(1, { message: "Current Password is required" }),
  new_password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: " passwords must be at least 8 characters long" })
    .max(64, { message: " passwords must be at most 64 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }
    ),
  confirm_password: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
});

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePass, { isLoading }] = useChangePasswordMutation();

  const route = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const passwordData = {
        current_password: data.current_password,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      };

      const res = await changePass(passwordData).unwrap();
      if (res.success) {
        toast.success(res?.message);
      }

      dispatch(logout());
      route.refresh();
      route.push("/sign-in");
    } catch (error) {
      // console.log("error__", error);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "confirm_password" || name === "new_password") {
        if (
          value.confirm_password &&
          value.new_password !== value.confirm_password
        ) {
          form.setError("confirm_password", {
            type: "manual",
            message: "Passwords do not match",
          });
        } else {
          form.clearErrors("confirm_password");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="lg:space-y-12 space-y-7">
      <Card
        className="max-w-[742px] mx-auto shadow-none border-none text-white"
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
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={currentPassword ? "text" : "password"}
                          placeholder="Enter Your current Password"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          {currentPassword ? (
                            <div
                              onClick={() => setCurrentPassword(false)}
                              className="cursor-pointer"
                            >
                              <Eye color="#A5A7A9" />
                            </div>
                          ) : (
                            <div
                              onClick={() => setCurrentPassword(true)}
                              className="cursor-pointer"
                            >
                              <EyeOff color="#A5A7A9" />
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Your Password"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          {showPassword ? (
                            <div
                              onClick={() => setShowPassword(false)}
                              className="cursor-pointer"
                            >
                              <Eye color="#A5A7A9" />
                            </div>
                          ) : (
                            <div
                              onClick={() => setShowPassword(true)}
                              className="cursor-pointer"
                            >
                              <EyeOff color="#A5A7A9" />
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter Your Password"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          {showConfirmPassword ? (
                            <div
                              onClick={() => setShowConfirmPassword(false)}
                              className="cursor-pointer"
                            >
                              <Eye color="#A5A7A9" />
                            </div>
                          ) : (
                            <div
                              onClick={() => setShowConfirmPassword(true)}
                              className="cursor-pointer"
                            >
                              <EyeOff color="#A5A7A9" />
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CommonButton className="w-full border-white">
                {isLoading ? "Loading..." : "Change Password"}
              </CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
