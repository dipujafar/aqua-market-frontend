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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { usePostFishReviewMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import CommonButton from "@/components/ui/common-button";

const formSchema = z.object({
  comment: z
    .string({ required_error: "Feedback is required" })
    .min(10, { message: "Feedback must be at least 10 characters long" }),
});

interface ISubmitYourReviewProps {
  className?: string;
  fishId: string;
}
const SubmitYourReview = ({ className, fishId }: ISubmitYourReviewProps) => {
  const [selectRating, setSelectRating] = useState(0);

  const [postFishReview] = usePostFishReviewMutation();

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const feedbackData = {
      rating: selectRating,
      comment: data.comment,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(feedbackData));

    try {
      const res = await postFishReview({
        id: fishId,
        data: formData,
      });

      if (res?.data?.success) {
        form.reset();
        setSelectRating(0);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log("error__________", error);
      toast.error("Something went wrong");
    }
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
              name="comment"
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
            <div>
              <CommonButton
                handlerFunction={() => postFishReview(selectRating)}
              >
                Submit
              </CommonButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubmitYourReview;
