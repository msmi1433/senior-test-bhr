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
  try {
    const { data }: { data: Absence[] } = await api.get("absences");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchConflict = async (conflictId: number) => {
  try {
    const { data } = await api.get(`conflict/${conflictId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
