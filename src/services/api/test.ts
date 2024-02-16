import { fetchAbsences } from "./apiCalls";

describe("fetchAbsences", () => {
  test("returns list of absences", async () => {
    const response = await fetchAbsences();
    response.forEach((absence) => {
      expect(absence).toHaveProperty("absenceType");
      expect(absence).toHaveProperty("approved");
      expect(absence).toHaveProperty("days");
      expect(absence).toHaveProperty("employee");
      expect(absence).toHaveProperty("id");
      expect(absence).toHaveProperty("startDate");
    });
  });
  test("appends conflicts to absence objects", async () => {
    const response = await fetchAbsences();
    response.forEach((absence) => {
      expect(absence).toHaveProperty("conflicts");
    });
  });
});
