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
import { useState } from "react";
import CommonButton from "@/components/ui/common-button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { ImageUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  image: z.string().optional(), // avatar image
  coverImage: z.string().optional(), // cover image added here
  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  storeName: z.string().optional(),
  about: z.string().optional(),
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
});

const ProfileContainerForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Ziaul Haque",
      lastName: "Shapona",
      userName: "Prince Shapona",
      email: "shapona@me.com",
      phoneNumber: "+8801712345678",
      streetAddress: "Banasree",
      zipCode: "5444",
      country: "Bangladesh",
      city: "Dhaka",
      state: "Dhaka Division",
      storeName: "Fish Store",
      about: "I am a fish seller",
    },
  });
  const { register, setValue, control } = form;

  const handleImageChange = (files: any) => {
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleCoverImageChange = (files: any) => {
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setCoverImagePreview(url);
    } else {
      setCoverImagePreview(null);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
              {/* Cover Image upload */}
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative w-full h-48 md:h-60 xl:h-64 rounded-lg overflow-hidden mb-6">
                      {coverImagePreview ? (
                        <Image
                          src={coverImagePreview}
                          alt="Cover Preview"
                          fill
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-400">
                          <p>Upload Cover Image</p>
                        </div>
                      )}

                      <Input
                        id="coverImageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          handleCoverImageChange(e.target.files);
                        }}
                      />
                      <label
                        htmlFor="coverImageInput"
                        className={cn(
                          "absolute bottom-4 right-4 bg-black/60 text-white size-8 rounded-full cursor-pointer hover:bg-slate-500 flex justify-center items-center"
                        )}
                      >
                        <ImageUp size={20} />
                      </label>

                      {coverImagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setCoverImagePreview(null);
                            field.onChange(null);
                          }}
                          className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Avatar upload */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative size-44 mx-auto md:-translate-y-32 -translate-y-24 ">
                      <CustomAvatar
                        className="md:size-44 size-28 object-cover mx-auto"
                        img={imagePreview || "/profile_placeholder.png"}
                        name="Ali Asraf"
                        fallbackClass="lg:text-5xl"
                      />

                      <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          handleImageChange(e.target.files);
                        }}
                      />
                      <label
                        htmlFor="avatarInput"
                        className={cn(
                          "absolute md:bottom-4 bottom-14  md:right-2 right-10 bg-black/60 text-white size-[29px] flex-center rounded-full cursor-pointer hover:bg-slate-500",
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
              <div  className="md:space-y-6 space-y-4 -translate-y-28">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="firstName"
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
                      name="lastName"
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
                  name="userName"
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
                  name="phoneNumber"
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
                  name="storeName"
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
                      country: form.getValues("country"),
                      state: form.getValues("state"),
                      city: form.getValues("city"),
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

              <CommonButton className="w-full -translate-y-28">Update</CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContainerForm;
