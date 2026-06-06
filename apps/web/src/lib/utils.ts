import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** cn() - merges Tailwind classes with clsx + tailwind-merge (shadcn pattern) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
