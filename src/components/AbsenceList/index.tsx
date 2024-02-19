import { useQuery } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";
import AbsenceItem from "../Absence";
import { Absence } from "../../types";
import { useState } from "react";

const AbsenceList = () => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortedDirection, setSortedDirection] = useState<string | null>("DESC");

  const sortAbsences = (data: Absence[]) => {
    switch (sortedColumn) {
      case "startDate":
        data.sort((a: Absence, b: Absence) => {
          return a.startDate.valueOf() - b.startDate.valueOf();
        });
        return sortedDirection === "ASC" ? data : data.reverse();
      case "endDate":
        data.sort((a: Absence, b: Absence) => {
          return a.endDate.valueOf() - b.endDate.valueOf();
        });
        return sortedDirection === "ASC" ? data : data.reverse();
      default:
        return data;
    }
  };

  const { data } = useQuery({
    queryKey: ["absences"],
    queryFn: fetchAbsences,
    select: (data) => sortAbsences(data),
  });

  console.log(data);
  console.log(sortedDirection);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="flex justify-start gap-10 text-left">
            <th className="w-1/5">Name</th>
            <th className="w-1/5">Absence Type</th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("startDate");
                if (sortedDirection === "ASC") {
                  setSortedDirection("DESC");
                  data?.select();
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
                  data?.select();
                }
              }}
            >
              Start Date
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("endDate");
                if (sortedDirection === "ASC") {
                  setSortedDirection("DESC");
                  data?.select();
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
                  data?.select();
                }
              }}
            >
              End Date
            </th>
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
