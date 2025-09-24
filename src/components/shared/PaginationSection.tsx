"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Pagination } from "react-pagination-bar";

interface PaginationSectionProps {
  className?: string;
  totalItems?: number;
  id: string;
  setName: string;
}

const PaginationSection = ({
  className,
  totalItems,
  id,
  setName,
}: PaginationSectionProps) => {
  const updateSearchParam = useUpdateSearchParams(id);
  const currentPage = useSearchParams()?.get(setName || "page");
  const pagePostsLimit = useSearchParams()?.get("limit");

  return (
    <div className={cn("mt-10 text-end", className)}>
      <Pagination
        currentPage={Number(currentPage) || 1}
        itemsPerPage={Number(pagePostsLimit) || 9}
        onPageChange={(pageNumber) =>
          updateSearchParam(setName || "page", pageNumber?.toString())
        }
        totalItems={totalItems as number}
        pageNeighbours={1}
      />
    </div>
  );
};

export default PaginationSection;
