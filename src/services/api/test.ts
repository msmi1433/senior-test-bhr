import { fetchAbsences, fetchConflict } from "./apiCalls";
import * as absences from "../../../data/absences.json";

describe("fetchAbsences", () => {
  test("returns list of absences", async () => {
    const response = await fetchAbsences();
    expect(response).toEqual(absences);
  });
});

describe("fetchConflict", () => {
  test("returns conflict based on provided ID", async () => {
    const response = await fetchConflict(4);
    expect(response).toEqual({ conflicts: true });
  });
});
