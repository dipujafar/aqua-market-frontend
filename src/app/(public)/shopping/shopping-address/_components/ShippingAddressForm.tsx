"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { Label } from "@radix-ui/react-label";
import { PhoneInput } from "@/components/ui/phone-input";
import CommonButton from "@/components/ui/common-button";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { useEffect, useState } from "react";
import { useUpdateShipingAddressMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  companyName: z.string().optional(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  streetAddress: z.string().min(5, {
    message: "Street address must be at least 5 characters.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  state: z.string({
    required_error: "Please select a state.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  shippingMethod: z.string({
    required_error: "Please select a shipping method.",
  }),
  rememberMe: z.boolean(),
});

export default function ShippingAddressForm() {
  const [value, setValue] = useState<string>("");
  // console.log("value", value);

  const [updateShippingAddress, { isLoading }] =
    useUpdateShipingAddressMutation();

  const { data: userData } = useGetUserProfileQuery(undefined);
  // console.log("userData", userData?.data?.shippingAddress);

  const existingShippingAddress = userData?.data?.shippingAddress;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      streetAddress: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      state: "",
      shippingMethod: "",
      rememberMe: false,
    },
  });
  const { register, control, reset } = form;

  // ✅ When userData loads, update form values
  useEffect(() => {
    if (existingShippingAddress) {
      reset({
        firstName: existingShippingAddress.firstName || "",
        lastName: existingShippingAddress.lastName || "",
        companyName: existingShippingAddress.companyName || "",
        streetAddress: existingShippingAddress.streetAddress || "",
        zipCode: existingShippingAddress.zipCode || "",
        phoneNumber: existingShippingAddress.phoneNumber || "",
        email: existingShippingAddress.email || "",
        country: existingShippingAddress.country || "",
        city: existingShippingAddress.city || "",
        state: existingShippingAddress.state || "",
        shippingMethod: existingShippingAddress.shippingMethod || "",
        rememberMe: false,
      });
    }
  }, [existingShippingAddress, reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateShippingAddress(values).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="w-full col-span-2 rounded-lg bg-transparent text-white">
      <h2 className="text-3xl mb-6">Shipping Address</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="py-5 border-[#fff]/80 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className="py-5 border-[#fff]/80 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company Name */}
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your company name"
                    {...field}
                    className="py-5 border-[#fff]/80 text-white placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country, State, City Selector */}
          <div className="grid w-full  items-center gap-1.5">
            <Label>Location</Label>
            <CountryStateCitySelector
              control={control}
              setValue={setValue}
              register={register}
            />
          </div>

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
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

          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email Address"
                    type="email"
                    {...field}
                    className="py-5 border-[#fff]/80 text-white placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shipping Method - replace static div with Select */}
          <div>
            <h5>Shipping Method</h5>
            <div className="flex justify-between gap-x-2 px-2.5 py-3 border border-[#fff]/80 rounded-md">
              <h6 className="text-white/50">
                Express <br /> 1 to 2 business days
              </h6>
              <h4 className="text-white/50 font-bold">$56.00</h4>
            </div>
          </div>

          {/* Remember Me */}
          <FormField
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl mb-0.5">Remember Me</FormLabel>
                <div className="flex flex-row items-start gap-x-2 rounded-md ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[#6c5dd3] border-[#fff]/80"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-white/80">
                      Save my information for a faster checkout with a Shop
                      account
                    </FormLabel>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <CommonButton type="submit" className="w-full border-white">
            Continue to payment
          </CommonButton>
        </form>
      </Form>
    </div>
  );
}
