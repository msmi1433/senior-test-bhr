export type Employee = {
  firstName: string;
  id: string;
  lastName: string;
};

export type Absence = {
  [index: string]:
    | string
    | boolean
    | number
    | Date
    | Employee
    | (() => Absence[]);
  absenceType: string;
  approved: boolean;
  days: number;
  employee: Employee;
  id: number;
  startDate: Date;
  endDate: Date;
  conflicts: boolean;
};

export type Conflict = {
  conflicts: boolean;
};
