"use client";;
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "@/icons";
import CommonButton from "@/components/ui/common-button";

// Define the form schema with Zod
const formSchema = z.object({
  fish: z.string().min(1, { message: "Fish name is required" }),
  seller: z.string().min(1, { message: "Seller name is required" }),
  reason: z.string().min(10, {
    message: "Please provide at least 10 characters for the reason",
  }),
  photos: z.array(z.any()).min(1, { message: "Please upload at least one photo" }),
});

// Define the type for our form values
type FishReportFormValues = z.infer<typeof formSchema>;

// Props for the component
export function ClaimSendDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [photos, setPhotos] = useState<File[]>([]);

  // Initialize the form
  const form = useForm<FishReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fish: "",
      seller: "",
      reason: "",
    },
  });

  // Handle form submission
  function onSubmit(data: FishReportFormValues) {
    console.log("Form submitted:", data);
    console.log("Photos:", photos);
    // Here you would typically send the data to your API
    setOpen(false);
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newPhotos]);
      // @ts-ignore
      form.setValue("photos", e.target.files);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        //   @ts-ignore
        showCloseIcon={false}
        style={{
          background: "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
        }}
        className="sm:max-w-[425px] border-none"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Fish</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Fish Name"
                      {...field}
                      className="bg-[linear-gradient(180deg,_rgba(77,_168,_218,_0.24)_0%,_rgba(120,_192,_168,_0.24)_85.08%)] border-white/50 text-white "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Seller From</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Seller Name"
                      {...field}
                      className="bg-[linear-gradient(180deg,_rgba(77,_168,_218,_0.24)_0%,_rgba(120,_192,_168,_0.24)_85.08%)] border-white/50 text-white "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Reason For Report
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter some details in here..."
                      {...field}
                      className="bg-[linear-gradient(180deg,_rgba(77,_168,_218,_0.24)_0%,_rgba(120,_192,_168,_0.24)_85.08%)] border-white/50 text-white min-h-[100px] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photos"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Upload Photos for evidence
                  </FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-white/50 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-950/30 transition-colors">
                      <input
                        type="file"
                        id="photo-upload"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleFileChange(e);
                          onChange(e.target.files);
                        }}
                        {...fieldProps} // value omitted intentionally
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <UploadIcon />
                        <span className="text-white">Upload Photos</span>
                        {photos.length > 0 && (
                          <span className="text-sm text-teal-400 mt-2">
                            {photos.length} photo
                            {photos.length !== 1 ? "s" : ""} selected
                          </span>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex sm:justify-between gap-2 pt-2">
              <CommonButton type="submit" className="flex-1 border-white">
                SUBMIT Claim
              </CommonButton>
              <Button
                style={{
                  background:
                    "linear-gradient(180deg, rgba(77, 168, 218, 0.30) 0%, rgba(120, 192, 168, 0.30) 85.08%)",
                }}
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1  text-white hover:text-white  py-5  rounded border-t-0 border-l-0 border-r-3 border-b-3 border-white cursor-pointer "
              >
                CANCEL
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
