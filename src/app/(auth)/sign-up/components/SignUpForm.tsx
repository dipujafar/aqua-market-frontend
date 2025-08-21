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
import { use, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import { PhoneInput } from "@/components/ui/phone-input";
import PageTopSection from "@/components/shared/PageTopSection";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/getErrorMessage";

const addressSchema = z.object({
  country: z.string().min(2).max(100).optional(),
  streetAddress: z.string().min(2).max(100).optional(),
  city: z.string().min(2).max(100).optional(),
  state: z.string().min(2).max(100).optional(),
  zipCode: z.string().min(2).max(100).optional(),
});

const formSchema = z.object({
  first_name: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  last_name: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  user_name: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  contact_number: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  store_name: z.string().optional(),
  address: addressSchema,
  password: z
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
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const userRole = useSearchParams().get("role");

  const [createUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { register, setValue, control } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    try {
      const res = await createUser(data).unwrap();
      // console.log("res______", res);
      if (res?.data?.otpToken?.token) {
        dispatch(
          setUser({
            token: res?.data?.otpToken?.token,
          })
        );
        toast.success(
          "You are registered successfully! Please verify your email."
        );
        router.push("/verify-otp");
      }
    } catch (error) {
      console.log("error______", error);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "confirmPassword" || name === "password") {
        if (value.confirmPassword && value.password !== value.confirmPassword) {
          form.setError("confirmPassword", {
            type: "manual",
            message: "Passwords do not match",
          });
        } else {
          form.clearErrors("confirmPassword");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title={`Join as a ${userRole}`}></PageTopSection>
      <Card
        className="max-w-[742px] mx-auto shadow-none border-none text-white"
        style={{
          background:
            "linear-gradient(180deg, rgba(77, 168, 218, 0.22) 0%, rgba(120, 192, 168, 0.22) 85.08%)",
          boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)",
        }}
      >
        <CardHeader>
          <div className="flex justify-between">
            <Link
              href={"/sign-in"}
              className="flex-1 flex justify-center items-center px-2.5 py-3"
            >
              Sign In
            </Link>

            <div className="flex-1 flex justify-center items-center bg-white  rounded-r-lg text-black px-2.5 py-3">
              Sign Up
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-6 space-y-4"
            >
              <div className=" flex flex-col md:flex-row md:items-center  gap-4 ">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
                            {...field}
                            className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
                            {...field}
                            className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your User Name"
                        {...field}
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        // @ts-ignore
                        value={field.value}
                        onChange={field.onChange}
                        international
                        defaultCountry="US"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {userRole === "Seller" && (
                <FormField
                  control={form.control}
                  name="store_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your store name"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Country, State, City Selector */}
              <div className="grid w-full  items-center gap-1.5">
                <Label>Location</Label>
                <CountryStateCitySelector
                  control={control}
                  setValue={setValue}
                  register={register}
                />
              </div>

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
                name="confirmPassword"
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agree}
                  onCheckedChange={() => setAgree(!agree)}
                />
                <label htmlFor="terms" className="text-secondary-gray">
                  By hitting the "Register" button, you agree to the{" "}
                  <Link
                    href={"/terms-conditions"}
                    className="text-gradiant font-medium"
                  >
                    Terms conditions
                  </Link>{" "}
                  &{" "}
                  <Link
                    href={"/terms-conditions"}
                    className="text-gradiant font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <CommonButton type="submit" disabled={!agree} className="w-full">
                {isLoading ? "Registering..." : "SIGN UP"}
              </CommonButton>

              <div className="flex justify-center gap-x-2">
                <p className="text-secondary-gray">Have an account?</p>
                <Link href={"/sign-in"}>
                  <span className="text-lg text-gradiant font-medium underline">
                    Sign In
                  </span>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
