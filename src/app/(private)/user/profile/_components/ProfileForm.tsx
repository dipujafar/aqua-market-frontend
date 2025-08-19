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
import { useState, useEffect } from "react";
import CommonButton from "@/components/ui/common-button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { ImageUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomAvatar from "@/components/shared/CustomAvatar";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userProfileApi";
import { toast } from "sonner";
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
  profile_image: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Must be a file",
    }),

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
  address: addressSchema,
});

const ProfileForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { data: userData } = useGetUserProfileQuery(undefined);
  const userInfo = userData?.data || {};
  // console.log("userInfo", userInfo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      contact_number: "",
      address: {
        streetAddress: "",
        zipCode: "",
        country: "",
        city: "",
        state: "",
      },
      profile_image: "",
    },
  });
  const { setValue, control, reset } = form;

  // ✅ When userData loads, update form values
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      reset({
        first_name: userInfo.first_name ?? "",
        last_name: userInfo.last_name ?? "",
        user_name: userInfo.user_name ?? "",
        email: userInfo.email ?? "",
        contact_number: userInfo.contact_number ?? "",
        address: {
          streetAddress: userInfo.address?.streetAddress ?? "",
          zipCode: userInfo.address?.zipCode ?? "",
          country: userInfo.address?.country ?? "",
          city: userInfo.address?.city ?? "",
          state: userInfo.address?.state ?? "",
        },
        profile_image: userInfo.profile_image ?? "",
      });

      // ✅ if user already has an profile_image, set preview
      if (userInfo.profile_image) {
        setImagePreview(userInfo.profile_image);
      }
    }
  }, [userInfo, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const fieldValues = { ...data };

    const formData = new FormData();
    formData.append("data", JSON.stringify(fieldValues));
    formData.append("profile_image", data.profile_image);

    try {
      const res = await updateProfile(formData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="lg:space-y-12 space-y-7">
      <Card
        className="max-w-[742px] mx-auto shadow-none border-none text-white"
        style={{
          background:
            "linear-gradient(180deg, rgba(77, 168, 218, 0.24) 0%, rgba(120, 192, 168, 0.24) 85.08%)",
          boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)",
        }}
      >
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-6 space-y-4"
            >
              {/* Image upload field */}
              <FormField
                control={form.control}
                name="profile_image"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative size-44 mx-auto ">
                      <CustomAvatar
                        className="size-44 object-cover mx-auto"
                        img={imagePreview || "/profile_placeholder.png"}
                        name={userInfo.first_name || "User"}
                        fallbackClass="lg:text-5xl"
                      />

                      <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.onChange(file); // store the actual File
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setImagePreview(url); // set preview
                          } else {
                            setImagePreview(null);
                          }
                        }}
                      />

                      <label
                        htmlFor="avatarInput"
                        className={cn(
                          "absolute bottom-4 right-2 bg-[#2E1345] text-white size-[29px] flex-center rounded-full cursor-pointer hover:bg-slate-500",
                          imagePreview && "hidden"
                        )}
                      >
                        <ImageUp size={20} />
                      </label>

                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            field.onChange(null); // reset RHF value
                          }}
                          className="absolute top-2 right-5 bg-red-500 text-white p-1 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Country, State, City Selector */}
              <div className="grid w-full  items-center gap-1.5">
                <Label>Location</Label>
                <CountryStateCitySelector
                  control={control}
                  setValue={setValue}
                  userAddress={{
                    country: form.getValues("address.country"),
                    state: form.getValues("address.state"),
                    city: form.getValues("address.city"),
                  }}
                />
              </div>

              <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-3">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="address.streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Street Address"
                            {...field}
                            className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Zip Code"
                            {...field}
                            className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <CommonButton className="w-full">
                {isLoading ? "Updating..." : "Update"}
              </CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
