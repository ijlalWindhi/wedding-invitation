import { categoryOptions, sessionOptions } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// OPTIONS KEY
export type sessionOptionKey = keyof typeof sessionOptions;
export type categoryOptionKey = keyof typeof categoryOptions;

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// NUMBER PAGINATION
export function numberPagination({
  currentPage,
  itemsPerPage,
  index,
}: {
  currentPage: number;
  itemsPerPage: number;
  index: number;
}) {
  return (currentPage - 1) * itemsPerPage + index + 1;
}
