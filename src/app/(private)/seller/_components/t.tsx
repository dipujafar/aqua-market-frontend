"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CommonButton from "@/components/ui/common-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChoosePricingType from "./ChoosePricingType";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAddFishMutation } from "@/redux/api/sellerApi";
import { useRouter } from "next/navigation";

const fishTypes = [
  "Betta Fish",
  "Guppies",
  "Neon Tetras",
  "Discus",
  "Yellow Watchman",
  "Clown fish",
  "Blue Tang",
  "Mandarin Goby",
  "Spotted Puffer fish",
  "Archer fish",
  "Flowerhorn",
  "Arowana",
  "Corydoras Catfish",
  "Other",
] as const;

const pricingInfoSchema = z.object({
  style: z.string({
    required_error: "Style is required",
  }),
  quantity: z.preprocess(
    (val) => (val ? Number(val) : 0),
    z.number().min(1, "Quantity must be at least 1")
  ),
  price: z.preprocess(
    (val) => (val ? Number(val) : 0),
    z.number().min(0, "Price must be a positive number")
  ),
  discount: z
    .preprocess(
      (val) => (val ? Number(val) : 0),
      z.number().min(0, "Discount must be a non-negative number")
    )
    .optional(),
  startingBid: z
    .preprocess(
      (val) => (val ? Number(val) : 0),
      z.number().min(0, "Starting bid must be a non-negative number")
    )
    .optional(),
  date: z
    .preprocess((arg) => (arg ? new Date(arg as string) : undefined), z.date())
    .optional(),
  time: z.string().optional(),
  estimateAvailability: z
    .preprocess((arg) => (arg ? new Date(arg as string) : undefined), z.date())
    .optional(),
});

const formSchema = z.object({
  image: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  fishType: z.enum(fishTypes, {
    required_error: "Please select a fish type.",
  }),
  fishName: z.string().min(2, "Fish name must be at least 2 characters"),
  commonName: z.string().min(2, "Common name must be at least 2 characters"),
  size: z.string().min(5, "Size information is required"),
  careLevel: z.string().min(5, "Care level information is required"),
  tankRequirements: z.string().min(10, "Tank requirement details are required"),
  foodRequirements: z.string().min(10, "Food requirement details are required"),
  behavior: z.string().min(10, "Behavior description is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  paymentSystem: z.string().optional(),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  doaPolicy: z.string().min(1, "DOA policy is required"),
  pricingType: z.enum(["directSale", "forBids", "preOrder"], {
    required_error: "Please select a pricing type",
  }),
  pricingInfo: pricingInfoSchema,
});

export type FormSchemaType = z.infer<typeof formSchema>;

export default function AddProductForm() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();

  const [addFish, { isLoading }] = useAddFishMutation();

  const form = useForm<FormSchemaType>({});

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    // Ensure currentImages is always an array
    const currentImages = form.getValues("image") || [];
    const newImages = [...currentImages, ...fileArray];

    form.setValue("image", newImages);

    // Create preview URLs
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("image");
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("image", newImages);

    // Clean up preview URL
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const fishData = {
      ...data,
      startingBid: Number(data.pricingInfo.startingBid) || 0,
      discount: Number(data.pricingInfo.discount) || 0,
      price: Number(data.pricingInfo.price) || 0,
      quantity: Number(data.pricingInfo.quantity) || 0,
    };

    console.log("fishData", fishData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(fishData));

    // Append all images
    data.image.forEach((img: File) => {
      formData.append("image", img);
    });

    try {
      const res = await addFish(formData).unwrap();
      // console.log("response", res);
      if (res.success) {
        toast.success(res.message);
        router.push("/seller/item-list-direct-sale");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className=" ">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Fish Images Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg font-medium">
                    Fish Images
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* Upload Area */}
                      <div
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-black/20 backdrop-blur-sm"
                      >
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-300">
                            Click to upload fish images
                          </p>
                        </label>
                      </div>

                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt={`Fish image ${index + 1}`}
                                width={200}
                                height={150}
                                className="w-full h-32 lg:h-44 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fishType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fish Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        className="w-full md:py-5 border-gray-600"
                      >
                        <SelectValue placeholder="Enter Fish Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                      className="text-white border-none"
                    >
                      {fishTypes.map((fish) => (
                        <SelectItem key={fish} value={fish}>
                          {fish}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fish Name and Common Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fishName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Fish Name</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Fish Name"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Common Name</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Fish Common Name"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Size and Care Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Size</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter minimum fish size"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="careLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Care Level</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Care Level"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Tank Requirement and Food Requirement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tankRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Tank Requirement
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter minimum tank requirement"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foodRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Food Requirement
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter food habit"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Behavior and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="behavior"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Behavior</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter some common behavior"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter some description"
                        {...field}
                        className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing Type */}
            <ChoosePricingType form={form} />

            {/* ---------- Shipping Address --------------- */}
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Shipping to your address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                      placeholder="Enter some description"
                      {...field}
                      className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* ---------- DOA Policy --------------- */}
            <FormField
              control={form.control}
              name="doaPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    DOA (Dead on Arrival)Policy:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                      placeholder="Enter some description"
                      {...field}
                      className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <CommonButton className="w-full border-white">
              {isLoading ? "Submitting..." : "Submit"}
            </CommonButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
