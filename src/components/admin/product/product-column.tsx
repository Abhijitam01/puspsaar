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
import { BadgeInfo, BadgeMinus, CheckCircle, Circle, Clock, MapPin, MoreHorizontal, Gauge } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation"; 
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { Badge } from "@/components/ui/badge";
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
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => {
      const vehicle = row.original
      return (
        <div className="space-y-1 max-w-[220px]">
          <div className="font-semibold truncate">
            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim ? `• ${vehicle.trim}` : ""}
          </div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
            VIN: {vehicle.vin}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {vehicle.location.city} • {vehicle.location.hub}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "vin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
    cell: ({ row }) => (
      <code className="text-xs bg-muted px-2 py-1 rounded">
        {row.original.vin}
      </code>
    ),
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pricing" />
    ),
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="text-sm">
          <div className="font-semibold">₹{product.sellingPrice.toLocaleString()}</div>
          <p className="text-[11px] text-muted-foreground">
            Acquisition: ₹{(product.costPrice ?? 0).toLocaleString()}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "vehicleStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lifecycle" />
    ),
    cell: ({ row }) => {
      const status = row.original.vehicleStatus
      const colors: Record<string, string> = {
        READY: "bg-emerald-100 text-emerald-700",
        RESERVED: "bg-blue-100 text-blue-700",
        INTAKE: "bg-amber-100 text-amber-700",
        INSPECTION: "bg-indigo-100 text-indigo-700",
        SOLD: "bg-slate-100 text-slate-700",
        RETIRED: "bg-slate-200 text-slate-700",
      }
      return (
        <Badge className={`${colors[status] ?? "bg-muted text-foreground"} text-[11px]`}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "inspectionStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inspection" />
    ),
    cell: ({ row }) => {
      const status = row.original.inspectionStatus
      const colors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        IN_PROGRESS: "bg-blue-100 text-blue-800",
        PASSED: "bg-emerald-100 text-emerald-800",
        FAILED: "bg-red-100 text-red-800",
      }
      return <Badge className={`${colors[status] ?? "bg-muted"}`}>{status}</Badge>
    },
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mileage / Test Drives" />
    ),
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="text-sm">
          <p className="font-medium">{product.mileage.toLocaleString()} km</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
            <Gauge className="w-3 h-3" />
            {product.testDriveCount ?? 0} drives
          </p>
        </div>
      )
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