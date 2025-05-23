"use client";;
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

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  image: z.string().optional(),
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

const ProfileForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    },
  });
  const { register, setValue, control } = form;

  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative size-44 mx-auto ">
                      <CustomAvatar
                        className="size-44 object-cover mx-auto"
                        img={imagePreview || "/profile_placeholder.png"}
                        name="Ali Asraf"
                        fallbackClass="lg:text-5xl"
                      ></CustomAvatar>

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

              <div className=" flex flex-col md:flex-row md:items-center  gap-4 ">
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

              {/* Country, State, City Selector */}
              <div className="grid w-full  items-center gap-1.5">
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
              <CommonButton className="w-full">Update</CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
