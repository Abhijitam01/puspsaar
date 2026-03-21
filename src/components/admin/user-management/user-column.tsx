"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Eye, UserX, UserRound, User, Venus, Mars, Transgender, CheckCircle2, XCircle, Check, BadgeCheck, BadgeAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/model/user";
import { useRouter } from "next/navigation";
import { JSX } from "react";

// Define gender config outside for reuse
const genderConfig: Record<
  string,
  { label: string; icon: JSX.Element; className: string }
> = {
  male: {
    label: "Male",
    icon: <Mars className="h-4 w-4" />,
    className: "bg-blue-100 text-blue-700",
  },
  female: {
    label: "Female",
    icon: <Venus className="h-4 w-4" />,
    className: "bg-orange-50 text-pink-700",
  },
  other: {
    label: "Other",
    icon: <Transgender className="h-4 w-4" />,
    className: "bg-rose-100 text-rose-700",
  },
  default: {
    label: "N/A",
    icon: <Transgender className="h-4 w-4" />,
    className: "bg-gray-100 text-gray-600",
  },
};


function ActionMenu({ user }: { user: IUser }) {
    const router = useRouter();

    const handleView = () => {
    router.push(`/admin/user/${user.id}`);
  };
 
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive"
            disabled={user.status !== 'active'}
          >
            <UserX className="mr-2 h-4 w-4" />
            {user.status === 'active' ? 'Deactivate' : 'Already Inactive'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{row.original.email || 'N/A'}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.phone || 'N/A'}</div>
    ),
  },
   {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.gender?.toLowerCase();
      const { label, icon, className } = genderConfig[gender ?? "default"];

      return (
        <Badge className={`rounded-full flex items-center gap-1 ${className}`}>
          {icon}
          {label}
        </Badge>
      );
    },
  },

{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.original.status?.toLowerCase();
    const isActive = status === "active";

    return (
      <Badge
        variant={isActive ? "default" : "secondary"}
        className={`rounded-full flex items-center justify-center p-1
          ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {isActive ? (
          <BadgeCheck className="h-6 w-6" />
        ) : (
          <BadgeAlert className="h-5 w-5" />
        )}
      </Badge>
    );
  },
},
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4"
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionMenu user={row.original} />,
  },
];