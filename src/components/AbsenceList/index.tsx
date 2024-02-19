import { useQuery } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";
import AbsenceItem from "../Absence";
import { Absence } from "../../types";
import { useCallback, useState } from "react";

const AbsenceList = () => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortedDirection, setSortedDirection] = useState<string | null>("DESC");

  const sortAbsences = useCallback(
    (data: Absence[]) => {
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
        case "name":
          data.sort((a: Absence, b: Absence) => {
            if (a.employee.firstName < b.employee.firstName) return -1;
            if (a.employee.firstName > b.employee.firstName) return 1;
            return 0;
          });
          return sortedDirection === "ASC" ? data : data.reverse();
        case "approvalStatus":
          data.sort((a: Absence, b: Absence) => {
            return Number(a.approved) - Number(b.approved);
          });
          return sortedDirection === "DESC" ? data : data.reverse();
        case "absenceType":
          data.sort((a: Absence, b: Absence) => {
            if (a.absenceType < b.absenceType) return -1;
            if (a.absenceType > b.absenceType) return 1;
            return 0;
          });
          return sortedDirection === "ASC" ? data : data.reverse();
        default:
          return data;
      }
    },
    [sortedColumn, sortedDirection]
  );

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
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("name");
                if (sortedDirection === "ASC") {
                  setSortedDirection("DESC");
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
                }
              }}
            >
              Name
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("absenceType");
                if (sortedDirection === "ASC") {
                  setSortedDirection("DESC");
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
                }
              }}
            >
              Absence Type
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("startDate");
                if (sortedDirection === "ASC") {
                  setSortedDirection("DESC");
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
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
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
                }
              }}
            >
              End Date
            </th>
            <th
              className="w-1/5"
              onClick={() => {
                setSortedColumn("approvalStatus");
                if (sortedDirection === "ASC") {
                  setSortedDirection("DESC");
                } else if (sortedDirection === "DESC") {
                  setSortedDirection("ASC");
                }
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
