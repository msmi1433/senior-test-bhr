import axios from "axios";
import { Conflict, Absence } from "../../types";

const api = axios.create({
  baseURL: "https://front-end-kata.brighthr.workers.dev/api/",
});

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
    const { data }: { data: Conflict } = await api.get(
      `conflict/${conflictId}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
