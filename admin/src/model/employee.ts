// Employee
export interface IEmployee {
  _id?: string;
  createdBy: string | null;
  userId: string;                 // linked to User system
  employeeCode: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  personalEmail: string;
  workPhone: string;

  // Employment details
  department?: IDepartment;        // full dept object
  departmentId?: string;
  designation: string;
  reportingTo?: IEmployee;         // manager object
  reportingToId?: string;
  status: EmployeeStatus;         // "ACTIVE" | "INACTIVE" | "SUSPENDED"
  employmentType: EmploymentType; // "FULL_TIME" | "PART_TIME" | "CONTRACT"

  // Dates
  joiningDate: string;            // ISO datetime
  confirmationDate?: string;
  lastWorkingDate?: string;

  // Compensation
  salary?: number;
  currency: string;               // default "INR"

  // Documents
  profileImage: string;
  
  // Emergency contact
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;

  // Address
  currentAddress?: Address;
  permanentAddress?: Address;

  // Audit
  createdAt: string;
  updatedAt: string;
}

// Department
export interface IDepartment {
  id: string;
  name: string;
  code: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  parent?: IDepartment;
  children?: IDepartment[];
  employees?: IEmployee[];
}

// Address
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ENUMS
export type EmployeeStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT";