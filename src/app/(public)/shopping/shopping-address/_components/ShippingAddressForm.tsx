"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { useEffect } from "react";
import {
  useCreateOrderMutation,
  useUpdateShipingAddressMutation,
} from "@/redux/api/userApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clearCart } from "@/redux/features/cartSlice";

// ✅ Validation schema
export const formSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  companyName: z.string().optional(),
  country: z.string({ required_error: "Country is required" }).optional(),
  streetAddress: z
    .string({ required_error: "Street address is required" })
    .optional(),
  city: z.string({ required_error: "City is required" }).optional(),
  state: z.string({ required_error: "State is required" }).optional(),
  zipCode: z.string({ required_error: "ZIP code is required" }).optional(),
  phoneNumber: z.string({ required_error: "Phone number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  shippingMethod: z.string({ required_error: "Shipping method is required" }),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
  rememberMe: z.boolean().optional(),
});

export default function ShippingAddressForm() {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  // console.log("cartData", cartData);

  const [updateShippingAddress, { isLoading }] =
    useUpdateShipingAddressMutation();
  const [createOrder] = useCreateOrderMutation();

  const { data: userData } = useGetUserProfileQuery(undefined);
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
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const { control, register, reset, handleSubmit } = form;

  // ✅ Sync existing shipping address
  useEffect(() => {
    if (existingShippingAddress) {
      reset(existingShippingAddress);
    }
  }, [existingShippingAddress, reset]);

  // ✅ Handle creating order
  const handleOrder = async (shippingMethod: string) => {
    const orderData = {
      items: cartData?.items,
      totalPrice: cartData?.totalPrice,
      paymentMethod: shippingMethod,
      quantity: cartData?.totalQuantity,
    };
    // console.log("orderData", orderData);

    try {
      const orderResp = await createOrder(orderData).unwrap();
      // console.log("orderResp", orderResp);

      if (orderResp.success) {
        dispatch(clearCart());
      }
      if (!orderResp?.data) {
        toast.error("Failed to initiate payment. Try again.");
        return;
      }

      // Delay 2 seconds before redirecting
      setTimeout(() => {
        window.location.href = orderResp.data.paymentURL;
      }, 2000);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // ✅ Handle form submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("values", values);
    try {
      const res = await updateShippingAddress(values).unwrap();
      if (!res.success) {
        toast.error(res.message || "Failed to update shipping address");
        return;
      }
      toast.success(res.message);

      await handleOrder(res?.data?.shippingAddress?.shippingMethod);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full col-span-2 rounded-lg bg-transparent text-white">
      <h2 className="text-3xl mb-6">Shipping Address</h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Company */}
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

          {/* Location */}
          <div className="grid w-full items-center gap-1.5">
            <Label>Location</Label>
            <CountryStateCitySelector
              control={control}
              setValue={form.setValue}
              register={register}
            />
          </div>

          {/* Phone */}
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

          {/* Payment Method */}
          <Controller
            control={control}
            name="shippingMethod"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="py-5 border-[#fff]/80 text-white w-full">
                  <SelectValue placeholder="Card" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {/* Remember Me */}
          <FormField
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl mb-0.5">Remember Me</FormLabel>
                <div className="flex items-start gap-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[#6c5dd3] border-[#fff]/80"
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel className="text-white/80">
                      Save my information for faster checkout
                    </FormLabel>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <CommonButton type="submit" className="w-full border-white">
            {isLoading ? "Loading..." : "Continue to payment"}
          </CommonButton>
        </form>
      </Form>
    </div>
  );
}
