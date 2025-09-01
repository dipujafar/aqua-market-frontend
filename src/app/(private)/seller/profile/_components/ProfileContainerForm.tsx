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
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userProfileApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";

const addressSchema = z.object({
  country: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

// ✅ Allow string (for existing image URL), File (for new uploads), or null
const fileSchema = z
  .any()
  .refine((file) => file instanceof File || file === null, {
    message: "Must be a file",
  });

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  profile_image: fileSchema,
  banner: fileSchema,
  user_name: z.string().min(1, { message: "User Name is required" }),
  contact_number: z.string().min(1, { message: "Phone Number is required" }),
  email: z.string().optional(),
  address: addressSchema,
  store_name: z.string().optional(),
  about: z.string().optional(),
});

type ProfileFormType = z.infer<typeof formSchema>;

const ProfileContainerForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  const router = useRouter();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { data: userData } = useGetUserProfileQuery(undefined);
  const userInfo = userData?.data || {};
  // console.log("userInfo", userInfo);

  const form = useForm<ProfileFormType>({
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

  // ✅ Reset form when user data loads
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
        profile_image: userInfo.profile_image?.url ?? null,
        banner: userInfo?.banner?.url ?? null,
      });

      if (typeof userInfo.profile_image === "string") {
        setImagePreview(userInfo.profile_image.url);
      }
      if (typeof userInfo.banner === "string") {
        setCoverImagePreview(userInfo.banner.url);
      }
    }
  }, [userInfo, reset]);

  const onSubmit = async (data: ProfileFormType) => {
    const profileData = {
      ...data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(profileData));
    formData.append("profile_image", data.profile_image);
    formData.append("banner", data.banner);

    try {
      const res = await updateProfile(formData).unwrap();
      // console.log("Profile updated successfully:", res);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        router.push("/seller/profile/seller-profile");
      }
    } catch (error) {
      // console.log("Error updating profile:", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="lg:space-y-12 space-y-7">
      <Card
        className="mx-auto shadow-none border-none text-white"
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
              {/* Banner Upload */}
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative w-full h-44 bg-gray-100 rounded-md overflow-hidden mx-auto">
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

                      <input
                        id="bannerInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.onChange(file);
                          if (file)
                            setCoverImagePreview(URL.createObjectURL(file));
                          else setCoverImagePreview(null);
                        }}
                      />

                      {!coverImagePreview && (
                        <label
                          htmlFor="bannerInput"
                          className="absolute bottom-2 right-2 bg-[#2E1345] text-white px-3 py-1 rounded cursor-pointer hover:bg-slate-500"
                        >
                          Upload Banner
                        </label>
                      )}

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

              {/* Avatar Upload */}
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
                          field.onChange(file);
                          if (file) setImagePreview(URL.createObjectURL(file));
                          else setImagePreview(null);
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
                            field.onChange(null);
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

              {/* Main Fields */}
              <div className="md:space-y-6 space-y-4 -translate-y-28 mt-40">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
                            {...field}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded md:py-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
                            {...field}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded md:py-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                          className="focus-visible:ring-0 rounded md:py-5"
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
                          disabled
                          readOnly
                          {...field}
                          className="focus-visible:ring-0 rounded md:py-5"
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
                          value={field.value as string}
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
                          className="focus-visible:ring-0 rounded md:py-5"
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

                <div className=" grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className=" col-span-full lg:col-span-4">
                    <FormField
                      control={form.control}
                      name="address.streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your street address"
                              {...field}
                              className="focus-visible:ring-0 rounded md:py-5"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" col-span-full lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your zip code"
                              {...field}
                              className="focus-visible:ring-0 rounded md:py-5"
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
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter some description..."
                          {...field}
                          className="focus-visible:ring-0 rounded min-h-[90px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CommonButton type="submit" className="w-full -translate-y-28">
                {isUpdating ? "Updating..." : "Update"}
              </CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContainerForm;
