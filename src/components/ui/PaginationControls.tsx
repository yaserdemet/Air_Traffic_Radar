import {
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  rowsPerPageOptions?: number[];
  showTotalText?: boolean;
}

export const PaginationControls = ({
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  className,
  rowsPerPageOptions = [5, 10, 20, 50],
  showTotalText = true,
}: PaginationControlsProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    onPageChange(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-4", className)}>
      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/60">
        <div className="flex items-center gap-2">
          <span>Satır:</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(val) => onItemsPerPageChange(Number(val))}
          >
            <SelectTrigger className="h-8 w-18 rounded-lg border border-slate-200/50 bg-card px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400/50 shadow-sm font-semibold text-foreground/70">
              <SelectValue placeholder={String(itemsPerPage)} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200/50">
              {rowsPerPageOptions.map((n) => (
                <SelectItem
                  key={n}
                  value={String(n)}
                  className="text-xs font-medium rounded-lg cursor-pointer"
                >
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {showTotalText && (
          <span className="hidden sm:inline italic text-[10px] tracking-wide opacity-80 uppercase">
            TOPLAM {totalItems.toLocaleString()} KAYIT
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-slate-200/50 shadow-sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronFirst className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-slate-200/50 shadow-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>
        <div className="px-3 min-w-[80px] text-center">
          <span className="text-[10px] font-bold text-blue-500/70 uppercase tracking-widest">
            {currentPage} / {totalPages}
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-slate-200/50 shadow-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-slate-200/50 shadow-sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronLast className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
