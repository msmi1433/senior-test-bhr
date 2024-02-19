import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";
import AbsenceItem from "../Absence";
import { useCallback, useState } from "react";
import { sortAbsences } from "../../utils/Sorting/sortAbsences";
import { Absence } from "../../types";

const AbsenceList = () => {
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortedDirection, setSortedDirection] = useState<string>("DESC");

  const { data }: UseQueryResult<Absence[], Error> = useQuery({
    queryKey: ["absences"],
    queryFn: fetchAbsences,
    select: useCallback(
      (data: Absence[]) => sortAbsences(data, sortedColumn, sortedDirection),
      [sortedColumn, sortedDirection]
    ),
  });

  const handleSortClick = () => {
    if (sortedDirection === "ASC") {
      setSortedDirection("DESC");
    } else if (sortedDirection === "DESC") {
      setSortedDirection("ASC");
    }
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="flex justify-start gap-10 text-left">
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("name");
                handleSortClick();
              }}
            >
              Name
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("absenceType");
                handleSortClick();
              }}
            >
              Absence Type
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("startDate");
                handleSortClick();
              }}
            >
              Start Date
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("endDate");
                handleSortClick();
              }}
            >
              End Date
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("approved");
                handleSortClick();
              }}
            >
              Approval Status
            </th>
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
