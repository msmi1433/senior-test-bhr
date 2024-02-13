import { Absence } from "../../types";
import EmployeeItem from "../Employee";
import { format, addDays } from "date-fns";

type Props = {
  absence: Absence;
};

const AbsenceItem = ({ absence }: Props) => {
  return (
    <div>
      <EmployeeItem employee={absence.employee} />
      <p>{absence.absenceType}</p>
      <p>Start Date: {format(absence.startDate, "dd/MM/yyyy")}</p>
      <p>
        End Date:{" "}
        {format(
          addDays(new Date(absence.startDate), absence.days),
          "dd/MM/yyyy"
        )}
      </p>
      <p>{absence.approved ? "Approved" : "Pending approval"}</p>
    </div>
  );
};

export default AbsenceItem;
