import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import AnimatedArrow from "../animatedArrows/AnimatedArrow";

const CommonButton = ({
  children,
  className,
  disabled = false,
  type,
  handlerFunction
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  handlerFunction?: () => void
}) => {
  return (
    <Button
      onClick={handlerFunction}
      type={type}
      style={{
        background: "linear-gradient(180deg, rgba(77, 168, 218, 0.60) 0%, rgba(120, 192, 168, 0.60) 85.08%)"
      }}
      disabled={disabled}
      className={cn(
        "rounded border-r-3 border-b-3 border-primary-deep-green uppercase md:min-w-40 md:py-5 cursor-pointer group",
        className
      )}
    >
      {children}
      <AnimatedArrow/>
    </Button>
  );
};

export default CommonButton;
