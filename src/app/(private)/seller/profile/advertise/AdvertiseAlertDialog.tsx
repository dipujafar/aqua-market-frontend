import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAddAdvertiseMutation } from "@/redux/api/sellerApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface advertiseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  fishId: string | null;
}

export function AdvertiseAlertDialog({
  open,
  setOpen,
  data,
  fishId,
}: advertiseProps) {

  console.log('fishId', fishId);

  const router = useRouter();

  const [addAdvertise] = useAddAdvertiseMutation();
  const handlePostAdd = async () => {
    try {
      const res = await addAdvertise({ data: data, id: fishId }).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        setOpen(false);
        router.back();
      }
    } catch (error) {
      console.log("error__", error);
      toast.error(getErrorMessage(error));
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        style={{
          background: "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
        }}
        className="text-white border-none"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You want to advertise the product? If you want then need to pay $20.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handlePostAdd}
            style={{
              background: "linear-gradient(180deg, #4DA8DA 0%, #78C0A8 85.08%)",
            }}
            className="cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
