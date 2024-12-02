import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  backgroundColor?: string;
//   hoverColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

const AnimatedButton = ({
  children,
  className,
  backgroundColor = "bg-violet-600",
//   hoverColor = "bg-white",
  textColor,  // Add this
  hoverTextColor = "text-white", // Add this with default
  ...props
}: AnimatedButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-start overflow-hidden transition-all rounded group",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "w-0 h-0 rounded absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1",
          backgroundColor
        )}
      />
      <span
        className={cn(
          "w-full transition-colors duration-300 ease-in-out z-10",
          textColor,
          `group-hover:${hoverTextColor}`
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;