"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

const SIgnInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const redirectUrl = useSearchParams()?.get("redirect");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // if (data.email == "user@gmail.com" && data.password == "112233A@") {
    //   router.push("/user/profile");
    //   return;
    // }
    // if (data.email == "seller@gmail.com" && data.password == "112233A@") {
    //   router.push("/seller/profile/seller-profile");
    //   return;
    // } else {
    //   toast.error("Invalid email or password");
    // }

    const formattedData = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(formattedData).unwrap();
      console.log("res______", res);
      const decodedUser = jwtDecode(res?.data?.accessToken) as {
        role?: string;
      };
      console.log("decodedUser", decodedUser);

      if (res.success) {
        dispatch(
          setUser({
            user: decodedUser,
            token: res?.data?.accessToken,
          })
        );
        toast.success(res?.message);
      }

      if (redirectUrl) {
        router.push(decodeURIComponent(redirectUrl));
        return;
      }
      if (decodedUser?.role === "user") {
        router.push("/user/profile");
        return;
      }
      if (decodedUser?.role === "seller") {
        router.push("/seller/profile");
        return;
      }
    } catch (error: any) {
      // Error_Modal({ title: error?.data?.message });
      toast.error(error?.data?.message);
    }
  };

  return (
    <Card
      className="max-w-[742px] mx-auto  border-none  text-white    "
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.22) 0%, rgba(120, 192, 168, 0.22) 85.08%)",
        boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)",
      }}
    >
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-primary-black bg-white rounded-l-lg px-2.5 py-3 text-black">
            Sign In
          </div>
          <Link
            href={"/choose-user-role"}
            className="flex-1 flex justify-center items-center px-2.5 py-3"
          >
            Sign Up
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-6 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      {...field}
                      className=" rounded py-5 bg-transparent"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        {...field}
                        className=" rounded py-5 bg-transparent"
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

            <div className="flex flew-wrap justify-between gap-y-3 md:flex-row">
              <div className="flex items-center space-x-2 ">
                <Checkbox id="terms" className="cursor-pointer" />
                <label
                  htmlFor="terms"
                  className="text-secondary-gray cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link href="/forget-password">
                <p className="text-secondary-gray">Forgot Password</p>
              </Link>
            </div>

            <CommonButton className="w-full">
              {isLoading ? "Loading..." : "SIGN IN"}
            </CommonButton>

            <div className="flex justify-center gap-x-2">
              <p className="text-secondary-gray">Don&apos;t have an account?</p>
              <Link href={"/choose-user-role"}>
                <span className="text-lg font-medium text-gradiant underline">
                  Sign Up
                </span>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SIgnInForm;
