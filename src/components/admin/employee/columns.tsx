"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock, MoreHorizontal, XCircle, Mail, Currency, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { EmployeeStatus, IDepartment, EmploymentType } from "@/model/employee";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmployeeDetailsSheet } from "./employeeDetailSheet";

// Use the base employee type but make certain fields optional for the table display
export type IEmployee = {
  _id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profileImage: string;
  personalEmail: string;
  workPhone: string;
  department?: IDepartment;
  salary?: number;
  designation: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  createdBy: string | null;
  userId: string;
  employeeCode: string;
  gender: string;
  joiningDate: string;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}

const getStatusBadge = (status: EmployeeStatus) => {
  const config = {
    ACTIVE: { variant: "outline" as const, className: "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300", Icon: CheckCircle },
    INACTIVE: { variant: "secondary" as const, className: "border-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", Icon: Clock },
    SUSPENDED: { variant: "destructive" as const, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", Icon: XCircle },
  }[status];
  
  return config ? (
    <Badge variant={config.variant} className={`${config.className} font-medium`}>
      <config.Icon className="w-3 h-3 mr-1" />
      {status}
    </Badge>
  ) : (
    <Badge variant="outline" className="font-medium">{status}</Badge>
  );
};

const getEmployeeTypeBadge = {
  FULL_TIME: { 
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    text: "Full Time"
  },
  PART_TIME: { 
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    text: "Part Time"
  },
  CONTRACT: { 
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    text: "Contract"
  },
} as const;

const getEmploymentTypeBadge = (employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT") => {
  const config = getEmployeeTypeBadge[employmentType];

  return (
    <div className={`rounded-full border flex item-center justify-center ${config?.className || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 "}`}>
     <div className="font-[10px] py-0.5 "> {config?.text || employmentType}</div>
    </div>
  );
};


export const columns: ColumnDef<IEmployee>[] = [
  // ✅ Checkbox selection
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
  // ✅ Avatar
  {
    accessorKey: "profileImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <img src={row.getValue("profileImage")} alt="Profile" className="w-10 h-10 p-0.5 rounded-full border border-muted-foreground" />
      </div>
    ),
    enableSorting: false,
  },
  //  Employee Code
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => (
      <div className="text-xs">
        {row.getValue("userId")}
      </div>
    ),

  },
  // ✅ Full Name + Email
  {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { firstName, middleName, lastName,  designation } = row.original;
      const fullName = `${firstName}${middleName ? ` ${middleName}` : ""} ${lastName}`;
      return (
        <div className="max-w-[200px]">
          <div className="font-xs truncate">{fullName}</div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-1 truncate">
            { designation}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },

  {
    accessorKey: "workPhone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
     cell: ({ row }) => {
      const { workPhone, personalEmail } = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-xs truncate">{workPhone}</div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 text-muted-foreground" />
            {personalEmail}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as EmployeeStatus;
      return getStatusBadge(status);
    },
    enableSorting: true,
  },

    {
    id: "salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => {
      const { salary,  department } = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-xs truncate">{department?.name || 'No Department'}</div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-1 truncate text-orange-400  ">
            <IndianRupee className="w-3 h-3 text-muted-foreground text-orange-400" />
            {salary}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
  accessorKey: "employmentType",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Type" />
  ),
  cell: ({ row }) => {
    const employmentType = row.getValue("employmentType") as keyof typeof getEmployeeTypeBadge;
    return getEmploymentTypeBadge(employmentType);
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
        <div className="text-xs ">
          <div>{format(date, "MMM dd, yyyy")}</div>
          <p className=" text-[10px] text-muted-foreground flex items-center gap-1 truncate mt-1 ">
            <Clock className="w-3 h-3 text-muted-foreground " />
            {format(date, "HH:mm")}</p>
        </div>
      ) : null;
    },
    enableSorting: true,
  },
  // ✅ Actions
  
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;
      const router = useRouter();
      const [isSheetOpen, setIsSheetOpen] = useState(false);

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
              <DropdownMenuItem onClick={() => setIsSheetOpen(true)} >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/admin/employee/edit/${employee._id}`)}  >
                Edit Employee
              </DropdownMenuItem>

              <DropdownMenuItem className="text-destructive hover:!text-destructive hover:!bg-red-100">
                Delete Employee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>

         <EmployeeDetailsSheet 
            employee={employee as any} // TODO: Update EmployeeDetailsSheet to accept partial employee data
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}
          />
         </>
      );
    },
  },
];