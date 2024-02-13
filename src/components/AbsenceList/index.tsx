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
      <ul className="list-none">
        {data?.map((absence) => (
          <li className="py-3" key={absence.id}>
            <AbsenceItem absence={absence} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AbsenceList;
