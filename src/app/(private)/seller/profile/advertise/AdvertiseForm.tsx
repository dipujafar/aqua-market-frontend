"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CommonButton from "@/components/ui/common-button";
import { AdvertiseAlertDialog } from "./AdvertiseAlertDialog";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  offerTitle: z.string().min(1, "Title is required"),
  offerDiscount: z
    .string()
    .min(1, "Discount percentage is required")
    .refine((val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, "Please enter a valid percentage between 0 and 100"),
  date: z.string().min(1, "Date is required"),
  time: z
    .string()
    .min(1, "Time is required")
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time (HH:MM)"
    ),
});

export default function AdvertiseForm() {
  const [openAlert, setOpenAlert] = useState(false);
  const [addData, setAddData] = useState<z.infer<typeof formSchema> | null>(
    null
  );

  const searchParams = useSearchParams();
  const fishId = searchParams.get("id");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerTitle: "",
      offerDiscount: "",
      time: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setOpenAlert(true);
    setAddData(data);
  };

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="offerTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Offer Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                      placeholder="Enter Offer Title"
                      {...field}
                      className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 rounded-lg md:h-12 h-10 focus:border-cyan-400 focus:ring-cyan-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offerDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Any Discount Offer
                  </FormLabel>
                  <FormControl>
                    <Input
                      style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                      placeholder="Any Discount Percentage %"
                      {...field}
                      className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 rounded-lg  md:h-12 h-10 focus:border-cyan-400 focus:ring-cyan-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Date"
                        {...field}
                        className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 rounded-lg md:h-12 h-10   focus:border-cyan-400 focus:ring-cyan-400"
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        style={{
                          background:
                            "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                        }}
                        placeholder="Enter Time"
                        {...field}
                        className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 rounded-lg md:h-12 h-10 pr-10 focus:border-cyan-400 focus:ring-cyan-400"
                        type="time"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CommonButton type="submit" className="w-full border-white">
              Submit
            </CommonButton>
          </form>
        </Form>
      </div>
      <AdvertiseAlertDialog
        data={addData}
        fishId={fishId}
        open={openAlert}
        setOpen={setOpenAlert}
      />
    </div>
  );
}
