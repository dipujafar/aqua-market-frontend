"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Camera, Trash2, X } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CommonButton from "@/components/ui/common-button";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const formSchema = z.object({
  fishImages: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required"),
  fishType: z.enum(fishTypes, {
    required_error: "Please select a fish type.",
  }),
  fishName: z.string().min(2, "Fish name must be at least 2 characters"),
  commonName: z.string().min(2, "Common name must be at least 2 characters"),
  size: z.string().min(5, "Size information is required"),
  careLevel: z.string().min(5, "Care level information is required"),
  tankRequirement: z.string().min(10, "Tank requirement details are required"),
  foodRequirement: z.string().min(10, "Food requirement details are required"),
  behavior: z.string().min(10, "Behavior description is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  paymentSystem: z.string().min(2, "Payment system is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  doaPolicy: z.string().min(1, "DOA policy is required"),
  pricingType: z.enum(["direct", "auction"], {
    required_error: "Please select a pricing type",
  }),
  styles: z
    .array(
      z.object({
        style: z.string().min(1, "Style is required"),
        quantity: z.string().min(1, "Quantity is required"),
        price: z.string().min(1, "Price is required"),
        date: z.string().optional(),
        time: z.string().optional(),
      })
    )
    .min(1, "At least one style is required"),
});

export default function BiddingItemAddProductForm() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [styles, setStyles] = useState([
    { style: "", quantity: "", price: "", date: "", time: "" },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fishImages: [],
      fishName: "",
      commonName: "",
      size: "",
      careLevel: "",
      tankRequirement: "",
      foodRequirement: "",
      behavior: "",
      description: "",
      paymentSystem: "",
      pricingType: "direct",
      shippingAddress: "",
      doaPolicy: "",
    },
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const currentImages = form.getValues("fishImages");
    const newImages = [...currentImages, ...fileArray];

    form.setValue("fishImages", newImages);

    // Create preview URLs
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("fishImages");
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("fishImages", newImages);

    // Clean up preview URL
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addStyle = () => {
    const newStyle = { style: "", quantity: "", price: "", date: "", time: "" };
    setStyles([...styles, newStyle]);
    const currentStyles = form.getValues("styles");
    form.setValue("styles", [...currentStyles, newStyle]);
  };

  const updateStyle = (index: number, field: string, value: string) => {
    const updatedStyles = styles.map((style, i) =>
      i === index ? { ...style, [field]: value } : style
    );
    setStyles(updatedStyles);
    form.setValue("styles", updatedStyles);
  };

  const removeStyle = (index: number) => {
    const updatedStyles = styles.filter((_, i) => i !== index);
    setStyles(updatedStyles);
    form.setValue("styles", updatedStyles);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission here
  }

  return (
    <div className=" ">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Fish Images Upload */}
            <FormField
              control={form.control}
              name="fishImages"
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
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                      <SelectTrigger className="w-full md:py-5 border-gray-600">
                        <SelectValue placeholder="Enter Fish Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent style={{ background: "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)" }} className="text-white border-none" >
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
                name="tankRequirement"
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
                name="foodRequirement"
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
            <FormField
              control={form.control}
              name="pricingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">
                    Choose Pricing Type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 "
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="direct"
                          id="direct"
                          className="border-gray-400 text-white"
                        />
                        <label
                          htmlFor="direct"
                          className="text-white/80  lg:text-base text-sm"
                        >
                          Direct Sale (Set a fixed price for immediate purchase)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 md:ml-auto">
                        <RadioGroupItem
                          value="auction"
                          id="auction"
                          className="border-gray-400 text-white/80"
                        />
                        <label
                          htmlFor="auction"
                          className="text-white/80 lg:text-base text-sm"
                        >
                          Auction (Buyers bid on your item, highest bid wins)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 md:col-span-2 mx-auto">
                        <RadioGroupItem
                          value="pre-order"
                          id="pre-order"
                          className="border-gray-400 text-white/80"
                        />
                        <label
                          htmlFor="pre-order"
                          className="text-white/80  lg:text-base text-sm"
                        >
                          Pre Order Now for this fish
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div>
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
                }}
                className="p-6 space-y-4 rounded-lg"
              >
                {styles.map((style, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-white text-sm mb-2 block">
                          Style
                        </label>
                        <Input
                          placeholder="Enter Style"
                          value={style.style}
                          onChange={(e) =>
                            updateStyle(index, "style", e.target.value)
                          }
                          style={{
                            background:
                              "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                          }}
                          className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">
                          Quantity
                        </label>
                        <Input
                          placeholder="Enter Quantity"
                          value={style.quantity}
                          onChange={(e) =>
                            updateStyle(index, "quantity", e.target.value)
                          }
                          style={{
                            background:
                              "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                          }}
                          className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white text-sm mb-2 block">
                        Starting Bid ($):
                      </label>
                      <Input
                        placeholder="Enter Price"
                        value={style.price}
                        onChange={(e) =>
                          updateStyle(index, "price", e.target.value)
                        }
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-white text-sm mb-2 block">
                          Date
                        </label>
                        <Input
                          type="date"
                          placeholder="Enter Date"
                          value={style.style}
                          onChange={(e) =>
                            updateStyle(index, "date", e.target.value)
                          }
                          style={{
                            background:
                              "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                          }}
                          className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">
                          Time
                        </label>
                        <Input
                          type="time"
                          placeholder="Enter Time"
                          value={style.quantity}
                          onChange={(e) =>
                            updateStyle(index, "time", e.target.value)
                          }
                          style={{
                            background:
                              "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                          }}
                          className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {/* remove another style */}
                {styles.length > 1 && (
                  <div className="flex">
                    <Button
                      type="button"
                      onClick={() => removeStyle(styles.length - 1)}
                      variant="outline"
                      className="ml-auto cursor-pointer text-red-500 hover:bg-gray-700 group hover:text-white/70 border-none  md:py-5 border-r-3 border-b-3 border-white"
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={addStyle}
                  variant="outline"
                  className="w-full  text-white hover:bg-gray-700 group hover:text-white/70 border-none  md:py-5 border-r-3 border-b-3 border-white"
                  style={{
                    background:
                      "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                  }}
                >
                  ADD ANOTHER STYLE <AnimatedArrow />
                </Button>
              </div>
            </div>

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

            <CommonButton className="w-full border-white">Submit</CommonButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
