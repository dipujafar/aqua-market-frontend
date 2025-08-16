// utils/errorMessage.ts
export const getErrorMessage = (error: unknown): string => {
  // RTK Query error format
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object"
  ) {
    return (error as { data?: { message?: string } }).data?.message || "An unexpected error occurred";
  }

  // Axios style
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response === "object"
  ) {
    return (error as any).response?.data?.message || "An unexpected error occurred";
  }

  // Native Error
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};
