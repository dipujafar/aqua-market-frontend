import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const CommonButton = ({
  children,
  className,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <Button
      style={{
        background: "linear-gradient(180deg, #4DA8DA 0%, #78C0A8 85.08%)"
      }}
      disabled={disabled}
      className={cn(
        "rounded border-r-3 border-b-3 border-primary-deep-green uppercase md:min-w-40 md:py-5 cursor-pointer",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
