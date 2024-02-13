import { fetchAbsences } from "./fetchAbsences";
import * as absences from "../../../data/absences.json";

describe.only("fetchAbsences", () => {
  test("returns list of absences", () => {
    return fetchAbsences().then((response) => {
      expect(response).toEqual(absences);
    });
  });
});
