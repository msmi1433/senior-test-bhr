import axios from "axios";
import { Conflict, Absence } from "../../types";

const api = axios.create({
  baseURL: "https://front-end-kata.brighthr.workers.dev/api/",
});

const fetchConflicts = async (conflictId: number): Promise<Conflict> => {
  try {
    const { data }: { data: Conflict } = await api.get(
      `conflict/${conflictId}`
    );
    return data;
  } catch (error) {
    throw new Error("Conflict not found");
  }
};

export const fetchAbsences = async (): Promise<Absence[]> => {
  const { data } = await api.get("absences");
  const absencesWithConflicts = Promise.all(
    data.map(async (absence: Absence) => {
      const { conflicts } = await fetchConflicts(absence.id);
      return { ...absence, conflicts };
    })
  );
  return await absencesWithConflicts;
};
