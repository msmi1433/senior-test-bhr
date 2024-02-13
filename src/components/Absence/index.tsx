import { Absence } from "../../types";
import EmployeeItem from "../Employee";

type Props = {
  absence: Absence;
};

const AbsenceItem = ({ absence }: Props) => {
  return (
    <div>
      <EmployeeItem employee={absence.employee} />
      <p>{absence.absenceType}</p>

      <p>{absence.approved ? "Approved" : "Pending approval"}</p>
    </div>
  );
};

export default AbsenceItem;
