'use client';

import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  IdCard,
  Clock,
  Hash,
  MapPin,
  Users,
  AlertCircle,
  Building,
  CheckCircle,
  Star,
  LucideShieldBan,
  PersonStanding,
  FileText,
  CircleUser,
  IndianRupee,
  CoinsIcon
} from 'lucide-react';
import { IEmployee, EmployeeStatus, EmploymentType, Address } from '@/model/employee';
import { Separator } from '@/components/ui/separator';

interface EmployeeDetailsSheetProps {
  employee: IEmployee
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmployeeDetailsSheet({ employee, open, onOpenChange }: EmployeeDetailsSheetProps) {
  if (!employee) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: EmployeeStatus) => {
    const config = {
      ACTIVE: { variant: "default" as const, className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full" },
      INACTIVE: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full" },
      SUSPENDED: { variant: "destructive" as const, className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full" },
    }[status];

    return (
      <Badge variant={config.variant} className={`${config.className}`}>
        {status}
      </Badge>
    );
  };

  const getEmploymentTypeBadge = (type: EmploymentType) => {
    const config = {
      FULL_TIME: { variant: "default" as const, className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg" },
      PART_TIME: { variant: "secondary" as const, className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg" },
      CONTRACT: { variant: "outline" as const, className: "border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300 rounded-lg" },
    }[type];

    return (
      <Badge variant={config.variant} className={config.className}>
        {type.replace('_', ' ')}
      </Badge>
    );
  };

  const renderAddress = (address: Address | undefined, title: string) => {
    if (!address) return null;

    return (
      <div className="space-y-2">
        <h4 className="font-medium text-sm">{title}</h4>
        <div className="text-sm text-muted-foreground">
          <div>{address.line1}</div>
          {address.line2 && <div>{address.line2}</div>}
          <div>{address.city}, {address.state}</div>
          <div>{address.postalCode}, {address.country}</div>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-2">
        <SheetHeader className="relative flex  items-center justify-center bg-purple-50 dark:bg-transparent rounded-lg">
          <Avatar className="w-20 h-20 shadow-lg border-gray-300 ">
            <AvatarImage src={employee.profileImage} />
            {/* <AvatarFallback className="text-lg">
                {employee.firstName[0]}{employee.lastName[0]}
              </AvatarFallback> */}
          </Avatar>
          <Star className='w-5 h-5 rounded-full text-orange-700  dark:text-yellow-500 absolute  top-17 right-35' />
          <h2 className="text-lg font-bold">
            {employee.firstName} {employee.middleName && `${employee.middleName} `}{employee.lastName}
          </h2>
          <p className="text-muted-foreground text-xs">
            {employee.designation} <span className='font-bold text-orange-700'>{employee.department && `• ${employee.department.name}`} </span>
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1 rounded-full">
              <span>{employee.employeeCode}</span>
            </Badge>
            {getStatusBadge(employee.status)}
            {getEmploymentTypeBadge(employee.employmentType)}
          </div>
        </SheetHeader>
        <Separator />

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10 shadow-sm">
          <div className="flex  gap-2 ">
            <CircleUser className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            <h3 className="font-semibold">Personal Information</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start justify-between gap-3">
              <div className='flex gap-2'>
                <IdCard className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                <p className="text-muted-foreground">Employee Code</p>
              </div>
              <p className="font-medium">{employee.employeeCode}</p>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className='flex gap-2'>
                <LucideShieldBan className="h-4 w-4 mt-0.5 text-purple-500 dark:text-purple-400" />
                <p className="text-muted-foreground">Gender</p>
              </div>
              <p className="font-medium capitalize">{employee.gender.toLowerCase()}</p>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className='flex gap-2'>
                <PersonStanding className="h-4 w-4 mt-0.5 text-cyan-500 dark:text-yellow-400" />
                <p className="text-muted-foreground">User ID</p>
              </div>
              <p className="font-medium capitalize">{employee.userId.toLowerCase()}</p>
            </div>
          </div>
        </div>
        <Separator className='' />

        {/* Work Information */}
        <div className="p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10   shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            <h3 className="font-semibold">Work Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              {employee.department && (
                <div className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <div>
                      <p className="text-xs">Dept : {employee.department.name} </p>
                      <p className="text-xs text-muted-foreground">Code: {employee.department.code}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Reports To</p>
                    <p className="font-medium text-xs">
                      ID: {employee.reportingToId || 'Not Assigned'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Hash className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Department ID</p>
                    <p className=" text-xs">{employee.departmentId}</p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Department Status</p>
                    <p className="text-xs">{employee.department?.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          {employee.department?.description && (
            <div className="mt-4 p-2.5 rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 mt-1 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Department Description</p>
                  <p className="text-xs mt-1 text-muted-foreground/90">{employee.department.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Separator />
        {/* Contact Information */}
        <div className="space-y-4  p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10   shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            <h3 className="font-semibold">Contact Information</h3>
          </div>
          {/* <h3 className="font-semibold flex items-center gap-2 dark:text-primary/70">
            <Mail className="h-5 w-5" /> Contact Information
          </h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5  text-blue-800 dark:text-blue-300" />
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{employee.personalEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-yellow-800 dark:text-yellow-300" />
                <div>
                  <p className="text-muted-foreground"> Phone</p>
                  <p className="font-medium">{employee.workPhone}</p>
                </div>
              </div>
            </div>
            {employee.emergencyContactName && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-red-800 dark:text-red-600" />
                  <div className="space-y-2">
                    <p className="text-muted-foreground ">Emergency Contact</p>
                    <p className="text-medium text-xs">
                      {employee.emergencyContactPhone} ({employee.emergencyContactRelation})
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Separator />

        {/* Dates & Employment */}
        <div className=" p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10   shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            <h3 className="font-semibold">Employment Dates</h3>
          </div>
          <div className='grid  grid-cols-1 md:grid-cols-2 gap-6'>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Joining Date</p>
                <p className="">{formatDate(employee.joiningDate)} </p>
              </div>
              
            </div>
            {employee.confirmationDate && (
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-700" />
                <div>
                  <p className="text-muted-foreground">Confirmation Date</p>
                  <p className="">{formatDate(employee.confirmationDate)}</p>
                </div>
              </div>
            )}
            {employee.lastWorkingDate && (
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Last Working Date</p>
                  <p className="font-medium">{formatDate(employee.lastWorkingDate)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Compensation */}
          {employee.salary && (
            <div className="space-y-4 ">
             
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <CoinsIcon className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-muted-foreground">Salary</p>
                    <p className="font-medium">{formatCurrency(employee.salary, employee.currency)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IndianRupee className="h-4 w-4 text-green-700" />
                  <div>
                    <p className="text-muted-foreground">Currency</p>
                    <p className="font-medium">{employee.currency}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
          <Separator />
        {/* Address Information */}
        {(employee.currentAddress || employee.permanentAddress) && (
          <div className="space-y-4 p-4 ">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <h3 className="font-semibold">Address Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {employee.currentAddress && renderAddress(employee.currentAddress, "Current Address")}
              {employee.permanentAddress && renderAddress(employee.permanentAddress, "Permanent Address")}
            </div>
          </div>
        )}
      <Separator />
        {/* System Information */}
        <div className="space-y-4 p-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Hash className="h-5 w-5" /> System Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground">Created At</p>
              <p className="font-medium">{formatDate(employee.createdAt)}</p>
            </div>
            {employee.updatedAt && (
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="">{formatDate(employee.updatedAt)}</p>
              </div>
            )}
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
}