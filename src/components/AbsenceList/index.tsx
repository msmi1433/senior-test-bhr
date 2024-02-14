import { useQuery } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";
import AbsenceItem from "../Absence";

const AbsenceList = () => {
  const { data } = useQuery({
    queryKey: ["absences"],
    queryFn: fetchAbsences,
  });

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="flex justify-start gap-10 text-left">
            <th className="w-1/5">Name</th>
            <th className="w-1/5">Absence Type</th>
            <th className="w-1/5">Start Date</th>
            <th className="w-1/5">End Date</th>
            <th className="w-1/5">Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((absence) => (
            <AbsenceItem key={absence.id} absence={absence} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceList;
