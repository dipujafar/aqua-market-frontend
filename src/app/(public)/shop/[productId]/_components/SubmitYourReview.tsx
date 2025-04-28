"use client";
import { InputRating } from "@/components/ui/inputrating";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
});

const SubmitYourReview = ({ className }: { className?: string }) => {
  const [selectRating, setSelectRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.18) 0%, rgba(120, 192, 168, 0.18) 85.08%)",
      }}
      className={cn("p-4 rounded-sm lg:space-y-8 space-y-6", className)}
    >
      <div>
        <h3 className="md:text-3xl text-xl font-medium">Submit Your Review</h3>
        <InputRating
          onRatingChange={handleRatingChange}
          className="w-36"
        ></InputRating>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-6 space-y-4"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write your review</FormLabel>
                  <FormControl>
                    <Textarea
                     style={{
                        background:
                          "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
                      }}
                      
                      placeholder="Enter Your User Name"
                      {...field}
                      className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded h-[100px] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubmitYourReview;
