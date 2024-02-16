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
  startDate: string;
  conflicts: boolean;
};

export type Conflict = {
  conflicts: boolean;
};
