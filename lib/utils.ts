import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  currency: "USD" | "EUR" | "GBP" = "USD",
  notation: "compact" | "standard" = "standard"
) {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    notation,
  };
  return new Intl.NumberFormat("en-US", options).format(Number(price));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
