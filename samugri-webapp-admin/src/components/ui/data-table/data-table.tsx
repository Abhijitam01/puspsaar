

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { DataTablePagination } from "./pagination";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    statusFilter?: {
        value: string;
        options: { value: string; label: string }[];
        onValueChange: (value: string) => void;
    };
    pagination?: {
        pageSize: number;
        pageIndex: number;
        pageCount: number;
        total: number;
    };
    onPaginationChange?: (pageIndex: number) => void;
    onSearch?: (searchTerm: string) => void;
    onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    statusFilter,
    pagination,
    onPaginationChange,
    onSearch,
    onPageSizeChange,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination: pagination ? {
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            } : undefined,
        },
        pageCount: pagination?.pageCount,
        manualPagination: Boolean(pagination),
    });

    const handleSearch = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setSearchTerm(value);
            if (onSearch) {
                onSearch(value);
            } else if (searchKey) {
                table.getColumn(searchKey)?.setFilterValue(value);
            }
        },
        [onSearch, searchKey, table]
    );



    return (
        <div className="space-y-4">
            {/* Search and Filter Inputs */}
            {(searchKey || onSearch || statusFilter) && (
                <div className="flex items-center justify-between gap-4 py-2 px-1 ">
                    <div className="flex items-center gap-4 flex-1">
                        {(searchKey || onSearch) && (
                            <div className="flex items-center gap-2 flex-1 max-w-md">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by customer name..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="h-10 pl-10 pr-4  border-border focus:ring-2 focus:ring-ring focus:border-ring rounded-md"
                                    />
                                </div>
                            </div>
                        )}
                        {statusFilter && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                                </div>
                                <Select value={statusFilter.value} onValueChange={statusFilter.onValueChange}>
                                    <SelectTrigger className="w-[160px] h-10 bg-background border-border focus:ring-2 focus:ring-ring focus:border-ring">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusFilter.options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="group hover:bg-muted/50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
                                    className="h-24 text-center"
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
                <div className="py-6 px-6">
                    <DataTablePagination
                        table={table}
                        totalItems={pagination.total}
                        currentPage={pagination.pageIndex}
                        totalPages={pagination.pageCount}
                        onPageChange={onPaginationChange}
                        onPageSizeChange={onPageSizeChange}
                    />
                </div>
            )}
        </div>
    );
} 
