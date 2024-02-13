import axios from "axios";

const api = axios.create({
  baseURL: "https://front-end-kata.brighthr.workers.dev/api/",
});

type Absence = {
  absenceType: string;
  approved: boolean;
  days: number;
  employee: {
    firstName: string;
    id: string;
    lastName: string;
  };
  id: number;
  startDate: string;
};

export const fetchAbsences = async () => {
  const { data }: { data: Absence[] } = await api.get("absences/");
  return data;
};
