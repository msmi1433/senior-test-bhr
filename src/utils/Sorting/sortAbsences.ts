import { Absence } from "../../types";

export const sortAbsences = (
  data: Absence[],
  sortedColumn: string,
  sortedDirection: string
) => {
  data.sort((a: Absence, b: Absence) => {
    if (sortedColumn === "name") {
      if (a.employee.firstName < b.employee.firstName) return -1;
      if (a.employee.firstName > b.employee.firstName) return 1;
      return 0;
    } else {
      if (a[sortedColumn] < b[sortedColumn]) return -1;
      if (a[sortedColumn] > b[sortedColumn]) return 1;
      return 0;
    }
  });
  return sortedColumn === "approved"
    ? sortedDirection === "DESC"
      ? data
      : data.reverse()
    : sortedDirection === "ASC"
    ? data
    : data.reverse();
};
