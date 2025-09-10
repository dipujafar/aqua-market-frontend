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
import { useState, useEffect, useCallback } from "react";
import CommonButton from "@/components/ui/common-button";
import { ImageUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomAvatar from "@/components/shared/CustomAvatar";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userProfileApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

const formSchema = z.object({
  first_name: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  last_name: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  profile_image: z.any().optional(),
  banner: z.any().optional(),
  user_name: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  about: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: userData, refetch } = useGetUserProfileQuery(undefined);
  const userInfo = userData?.data || {};
  // console.log("userInfo", userInfo);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      user_name: "",
      profile_image: null,
      about: "",
    },
  });

  const { reset } = form;

  // Memoized function to set form values from user data
  const setFormValuesFromUserData = useCallback(() => {
    if (userInfo && Object.keys(userInfo)?.length > 0) {
      reset({
        first_name: userInfo.first_name ?? "",
        last_name: userInfo.last_name ?? "",
        user_name: userInfo.user_name ?? "",
        profile_image: null,
        about: userInfo.about ?? "",
      });

      if (userInfo?.profile_image?.url) {
        setImagePreview(userInfo.profile_image.url);
      }
    }
  }, [userInfo, reset]);

  // Initialize form with user data
  useEffect(() => {
    setFormValuesFromUserData();
  }, [setFormValuesFromUserData]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      // Separate files from other data
      const { profile_image, banner, ...otherData } = data;

      // Append JSON data
      formData.append("data", JSON.stringify(otherData));

      // Append files only if they are File objects (new uploads)
      if (profile_image instanceof File) {
        formData.append("profile_image", profile_image);
      }

      if (banner instanceof File) {
        formData.append("banner", banner);
      }

      const res = await updateProfile(formData).unwrap();
      // console.log("res", res);

      if (res?.success) {
        toast.success(res?.message);
        refetch();
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
                        name={userInfo.user_name || "User"}
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
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded md:py-5"
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
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded md:py-5"
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
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded md:py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Update Your Bio"
                        {...field}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded md:py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CommonButton
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
