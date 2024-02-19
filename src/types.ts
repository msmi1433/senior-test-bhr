export type Employee = {
  firstName: string;
  id: string;
  lastName: string;
};

export type Absence = {
  absenceType: string;
  approved: boolean;
  days: number;
  employee: Employee;
  id: number;
  startDate: Date;
  endDate: Date;
  conflicts: boolean;
  select: () => Absence[];
};

export type Conflict = {
  conflicts: boolean;
};
