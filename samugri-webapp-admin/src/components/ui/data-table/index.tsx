"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter, Search, RefreshCw } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DataTablePagination } from "./pagination"




interface FilterOption {
  value: string;
  label: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // Optional toolbar props
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filters?: {
    key: string
    placeholder: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
  }[]
  onRefresh?: () => void
  onClearFilters?: () => void
  isLoading?: boolean
  // Server-side pagination props
  pagination?: {
    pageIndex: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
  onPaginationChange?: (pageIndex: number, pageSize: number) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filters = [],
  onRefresh,
  onClearFilters,
  isLoading = false,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // Remove client-side pagination since we're using server-side
    manualPagination: true,
    pageCount: pagination?.totalPages ?? 0,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      }
    },
  })

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + R for refresh
      if ((event.ctrlKey || event.metaKey) && event.key === 'r' && onRefresh) {
        event.preventDefault();
        onRefresh();
      }
      // Escape key to clear filters
      if (event.key === 'Escape' && onClearFilters) {
        onClearFilters();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onRefresh, onClearFilters]);

  return (
    <TooltipProvider>
      <div>
        {/* Results Summary */}
      {pagination && (
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground ">
          <div>
            Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, pagination.totalItems)} of{" "}
            {pagination.totalItems} results
          </div>
          {isLoading && (
            <div className="flex items-center space-x-1">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Loading...</span>
            </div>
          )}
        </div>
      )}
      
      {/* Toolbar */}
      {(onSearchChange || filters.length > 0 || onRefresh || onClearFilters) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Search */}
            {onSearchChange && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Input 
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-[300px] pl-9 rounded-sm"
                />
              </div>
            )}

            {/* Filters */}
            {filters.map((filter) => (
              <div key={filter.key} className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select value={filter.value} onValueChange={filter.onChange}>
                  <SelectTrigger className="w-[180px] pl-9">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {onRefresh && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh data (Ctrl+R)</p>
                </TooltipContent>
              </Tooltip>
            )}
            {onClearFilters && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                  >
                    Clear Filters
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear all filters (Esc)</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      )}

      {/* Table Container with Loading Overlay */}
      <div className={`rounded-md border ${isLoading ? 'relative' : ''}`}>
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-md">
            <div className="flex items-center space-x-2 text-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        )}
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow 
                key={headerGroup.id}
                className="hover:bg-muted/50"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}
                      className="text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={`loading-cell-${colIndex}`} className="h-16">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id}
                      className="text-foreground"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {pagination && (
        <div className="border-t pt-4">
          <DataTablePagination
            table={table}
            totalItems={pagination.totalItems}
            currentPage={pagination.pageIndex + 1}
            totalPages={pagination.totalPages}
            onPageChange={(page) => {
              if (onPaginationChange) {
                onPaginationChange(page - 1, pagination.pageSize);
              }
            }}
            onPageSizeChange={(pageSize) => {
              if (onPaginationChange) {
                onPaginationChange(0, pageSize); // Reset to first page
              }
            }}
          />
        </div>
      )}
      </div>
    </TooltipProvider>
  )
}