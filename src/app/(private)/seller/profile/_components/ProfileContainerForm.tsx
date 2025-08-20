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
import CommonButton from "@/components/ui/common-button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { ImageUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";

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
  banner: z.any().refine((file) => file instanceof File || file === null, {
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
  store_name: z.string().optional(),
  about: z.string().optional(),
});

const ProfileContainerForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  const { data: userData, isLoading } = useGetUserProfileQuery(undefined);
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
      store_name: "",
      about: "",
      profile_image: null,
      banner: null,
    },
  });
  const { register, setValue, control, reset } = form;

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
        store_name: userInfo.store_name ?? "",
        about: userInfo.about ?? "",
        profile_image: userInfo.profile_image ?? "",
        banner: userInfo.banner ?? "",
      });

      // ✅ if user already has an profile_image, set preview
      if (userInfo.profile_image) {
        setImagePreview(userInfo.profile_image);
      }
      if (userInfo.banner) {
        setCoverImagePreview(userInfo.banner);
      }
    }
  }, [userInfo, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (coverImagePreview) URL.revokeObjectURL(coverImagePreview);
    };
  }, [coverImagePreview]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const fieldValues = { ...data };

    console.log("fieldValues", fieldValues);
  };

  return (
    <div className="lg:space-y-12 space-y-7">
      <Card
        className=" mx-auto shadow-none border-none text-white    "
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
              {/* Cover Banner upload */}
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative w-full h-44 bg-gray-100 rounded-md overflow-hidden mx-auto">
                      {/* Banner preview */}
                      {coverImagePreview ? (
                        <img
                          src={coverImagePreview}
                          alt="Banner Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                          No banner selected
                        </div>
                      )}

                      {/* Hidden file input */}
                      <input
                        id="bannerInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.onChange(file); // store file in RHF
                          if (file)
                            setCoverImagePreview(URL.createObjectURL(file));
                          else setCoverImagePreview(null);
                        }}
                      />

                      {/* Upload button */}
                      {!coverImagePreview && (
                        <label
                          htmlFor="bannerInput"
                          className="absolute bottom-2 right-2 bg-[#2E1345] text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500"
                        >
                          Upload Banner
                        </label>
                      )}

                      {/* Remove button */}
                      {coverImagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setCoverImagePreview(null);
                            field.onChange(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image upload field */}
              <FormField
                control={form.control}
                name="profile_image"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative size-44 mx-auto -mt-24">
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
              <div className="md:space-y-6 space-y-4 -translate-y-28 mt-40">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
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

                {/* Country, State, City Selector */}
                <div className="grid w-full items-center gap-1.5">
                  <Label>Location</Label>
                  <CountryStateCitySelector
                    control={control}
                    setValue={setValue}
                    register={register}
                    userAddress={{
                      country: form.getValues("address.country"),
                      state: form.getValues("address.state"),
                      city: form.getValues("address.city"),
                    }}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter some description..."
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  min-h-[90px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CommonButton type="submit" className="w-full -translate-y-28">
                {isLoading ? "Loading..." : "Update"}
              </CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContainerForm;
