import { Absence } from "../../types";
import EmployeeItem from "../Employee";
import { format } from "date-fns";

type Props = {
  absence: Absence;
};

const AbsenceItem = ({ absence }: Props) => {
  return (
    <tr
      className={`flex justify-start gap-10 py-0.5 ${
        absence.conflicts && "bg-red-400"
      }`}
    >
      <td className="w-1/5">
        <EmployeeItem employee={absence.employee} />
      </td>
      <td className="w-1/5">
        <p>{absence.absenceType}</p>
      </td>
      <td className="w-1/5">
        <p>{format(absence.startDate, "dd/MM/yyyy")}</p>
      </td>
      <td className="w-1/5">
        <p>{format(absence.endDate, "dd/MM/yyyy")}</p>
      </td>
      <td className="w-1/5">
        <p>{absence.approved ? "Approved" : "Pending approval"}</p>
      </td>
    </tr>
  );
};

export default AbsenceItem;
