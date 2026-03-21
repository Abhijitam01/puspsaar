'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";

import { IProduct } from "@/model/product";
import { Badge, BadgeInfo, BadgeMinus, CheckCircle, Circle, Clock, MoreHorizontal, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation"; 
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
// import ProductPreview from "./product-details";


type Status = "ACTIVE" | "DRAFT" | "INACTIVE";
const statusConfig: Record<Status, { icon: JSX.Element; color: string }> = {
  ACTIVE: {
    icon: <CheckCircle className="w-4 h-4 mr-1 text-success" />,
    color: "text-green-500 rounded-full",
  },
  DRAFT: {
    icon: <BadgeInfo className="w-4 h-4 mr-1 text-warning" />,
    color: "text-yellow-500 rounded-full",
  },
  INACTIVE: {
    icon: <BadgeMinus className="w-4 h-4 mr-1 text-destructive" />,
    color: "text-red-500 rounded-full",
  },
};

export const columns: ColumnDef<IProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const images = row.getValue("images") as any[];
      const url = images?.[0]?.url;
      return url ? (
        <div className="flex items-center">
        <img src={url} alt="Product" className="w-10 h-10 p-0.5 rounded-full border border-muted-foreground " /></div>
      ) : (
        <div className="w-10 h-10 rounded-md border border-dashed flex items-center justify-center text-xs text-muted-foreground">N/A </div>
      );
    }, enableSorting: false,
  },

 {
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Product Name" />
  ),
  cell: ({ row }) => (
     <div className=" max-w-[180px]">
      <div className="font-medium truncate" title={row.getValue("name")}>
        {row.getValue("name")}
      </div>
      <div className="text-muted-foreground text-[10px]  truncate" title={row.original._id}>
        ID: {row.original._id}
      </div>
    </div>
  ),
},
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => <div>{row.getValue("sku")}</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div className="text-sm font-semibold">₹{row.getValue("sellingPrice")}</div>,
  },
  {
    accessorKey: "stockStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("stockStatus") as string;
      const color =
        status === "IN_STOCK"
        ? "text-green-500 "
        : status === "LOW_STOCK"
          ? "text-yellow-500"
          : status === "OUT_OF_STOCK"
            ? "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground";


      return <div className={` flex justify-start items-center font-semibold rounded-full `}>
       <p className={`${color} text-[10px] px-2 py-1 border-1 border-muted-foreground rounded-full`}>{status}</p>
        </div>;
    },

  },
  {
    accessorKey: "warehouseInventory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const inventory = row.getValue("warehouseInventory") as any[];
      const total = inventory?.reduce(
        (sum, w) => sum + (w.availableQuantity || 0),
        0
      );
      return <div className="">{total ?? 0}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
    const status = row.getValue("status") as Status;
    const config = statusConfig[status] ?? {
      icon: <Circle className="w-4 h-4 mr-1 text-muted-foreground" />,
      color: "text-muted-foreground bg-muted",
    };

    return (
      <Badge className={`flex items-center gap-1 ${config.color}`}>
        {config.icon}
        {status}
      </Badge>
    );
    },
  },
  
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") ? new Date(row.getValue("createdAt")) : null;
      return date ? (
        <div className="">
          <div>{format(date, "MMM dd, yyyy")}</div>
          <p className=" text-[10px] text-muted-foreground flex items-center gap-1 truncate mt-1 ">
            <Clock className="w-3 h-3 text-muted-foreground " />
            {format(date, "HH:mm")}</p>
        </div>
      ) : null;
    },
    enableSorting: true,
  },

  {
    id: "actions",
    accessorKey: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const router = useRouter();
      const [open, setOpen] = useState(false);

      const   handleView = () => {
        router.push(`/admin/product/${product._id}`);
      }
      const handleEdit = () => {
        router.push(`/admin/product/edit/${product._id}`);
      };
      return (
        <>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleView}>
                  View Product
                </DropdownMenuItem>
                <DropdownMenuItem   onClick={handleEdit} >
                  Edit Product
                </DropdownMenuItem>

                <DropdownMenuItem className="text-destructive hover:!text-destructive hover:!bg-destructive/10">
                  Delete Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <ProductPreview
              product={product}
              open={open}
              onOpenChange={setOpen}
            /> */}
          </Dialog>
        </>
      )
    }

  }
]