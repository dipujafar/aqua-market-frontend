"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchemaType } from "./AddProductForm";
import { Input } from "@/components/ui/input";

interface ChoosePricingTypeProps {
  form: UseFormReturn<FormSchemaType>;
}

const ChoosePricingType = ({ form }: ChoosePricingTypeProps) => {
  const pricingType = form.watch("pricingType");
  // console.log("pricingType", pricingType);

  return (
    <>
      {/* Radio Options */}
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
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 "
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="directSale" id="directSale" />
                  </FormControl>
                  <FormLabel
                    htmlFor="directSale"
                    className="text-white/80 lg:text-base text-sm cursor-pointer"
                  >
                    Direct Sale (Set a fixed price for immediate purchase)
                  </FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-x-2 md:ml-auto">
                  <FormControl>
                    <RadioGroupItem value="forBids" id="forBids" />
                  </FormControl>
                  <FormLabel
                    htmlFor="forBids"
                    className="text-white/80 lg:text-base text-sm cursor-pointer"
                  >
                    Auction (Buyers bid on your item, highest bid wins)
                  </FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-x-2 md:col-span-2 mx-auto">
                  <FormControl>
                    <RadioGroupItem value="preOrder" id="preOrder" />
                  </FormControl>
                  <FormLabel
                    htmlFor="preOrder"
                    className="text-white/80 lg:text-base text-sm cursor-pointer"
                  >
                    Pre Order Now for this fish
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-300" />
          </FormItem>
        )}
      />

      {/* Conditionally Render Input Boxes */}
      {pricingType === "directSale" && (
        <div
          className="p-6 space-y-4 rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Style</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Style"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Quantity"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Price"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Any Discount Offer
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Discount Percentage %"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      )}

      {pricingType === "forBids" && (
        <div
          className="p-6 space-y-4 rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Style</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Style"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Quantity"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.startingBid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Starting Bid</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Starting Bid"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Price"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                        className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Time</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Time"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      )}

      {pricingType === "preOrder" && (
        <div
          className="p-6 space-y-4 rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
          }}
        >
          <div>
            <FormField
              control={form.control}
              name="pricingInfo.estimateAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Estimate Availability
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined
                        )
                      }
                      className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Style</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Style"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Quantity"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.startingBid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Starting Bid</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Starting Bid"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Price"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                        className="border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="pricingInfo.time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Time</FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Time"
                        {...field}
                        className=" border-gray-600 text-white placeholder:text-gray-400 md:py-5"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChoosePricingType;
