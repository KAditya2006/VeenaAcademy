import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide" | "reading";
};

const sizes = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  wide: "max-w-[1440px]",
  reading: "max-w-3xl",
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)} {...props} />;
}
