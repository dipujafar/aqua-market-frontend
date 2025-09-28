"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Camera, Trash2, Video, X } from "lucide-react";
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
import ChoosePricingType from "./ChoosePricingType";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAddFishMutation } from "@/redux/api/sellerApi";
import { useRouter } from "next/navigation";

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
  video: z.instanceof(File).optional(),
  fishName: z.string().min(2, "Fish name must be at least 2 characters"),
  size: z.string().min(5, "Size information is required"),
  tankRequirements: z.string().optional(),
  foodRequirements: z.string().optional(),
  behavior: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  paymentSystem: z.string().optional(),
  shippingAddress: z.string().optional(),
  doaPolicy: z.string().min(1, "DOA policy is required"),
  pricingType: z.enum(["directSale", "forBids", "preOrder"], {
    required_error: "Please select a pricing type",
  }),
  pricingInfo: pricingInfoSchema,
});

export type FormSchemaType = z.infer<typeof formSchema>;

export default function AddProductForm() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();

  const [addFish, { isLoading }] = useAddFishMutation();

  const form = useForm<FormSchemaType>({});

  // Handle video upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL for video
      const previewUrl = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoPreview(previewUrl); // Store the preview URL for the video
    }
  };

  // Remove video
  const removeVideo = () => {
    setVideoPreview(null);
    setVideoFile(null);
  };

  // Handle image upload
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    const currentImages = form.getValues("image") || [];
    const newImages = fileArray.map((file, index) => ({
      url: URL.createObjectURL(file),
      key: `image-${Date.now()}-${index}`,
      file,
    }));

    // @ts-ignore
    form.setValue("image", [...currentImages, ...newImages]);

    // Create preview URLs for image previews
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

    // console.log("fishData", fishData);

    const formData = new FormData();

    formData.append("data", JSON.stringify(fishData));
    if (videoFile) {
      formData.append("video", videoFile);
    }
    data.image.forEach((img: File) => {
      // @ts-ignore
      formData.append("image", img?.file);
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
                    Images
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
                            Click to upload images
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

            {/* Video Upload Section */}
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg font-medium">
                    Video
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* Video Upload Area */}
                      <div
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-black/20 backdrop-blur-sm"
                      >
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                          id="video-upload"
                        />
                        <label
                          htmlFor="video-upload"
                          className="cursor-pointer"
                        >
                          <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-300">
                            Click to upload a video
                          </p>
                        </label>
                      </div>

                      {/* Video Preview */}
                      {videoPreview && (
                        <div className="mt-4">
                          <video width="300" controls className="rounded-lg">
                            <source src={videoPreview} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <button
                            type="button"
                            onClick={removeVideo}
                            className="mt-2 text-red-500 cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
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
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Name"
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
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Size</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter minimum size"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            {/* Behavior and Description */}
            <div className="grid grid-cols-1">
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
