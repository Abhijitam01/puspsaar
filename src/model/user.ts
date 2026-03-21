export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IUser {
  id: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  gender?: Gender | null;
  status: string; // active, inactive, suspended
  createdAt: string;
  updatedAt: string;
}