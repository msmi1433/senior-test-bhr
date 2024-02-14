import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import AbsenceList from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";

jest.mock("../../services/api/apiCalls");
afterEach(() => {
  queryClient.clear();
});

const queryClient = new QueryClient();
const mockAbsenceData = [
  {
    id: 0,
    startDate: "2022-05-28T04:39:06.470Z",
    days: 9,
    absenceType: "SICKNESS",
    employee: {
      firstName: "Rahaf",
      lastName: "Deckard",
      id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
    },
    approved: true,
  },
  {
    id: 1,
    startDate: "2022-02-08T08:02:47.543Z",
    days: 5,
    absenceType: "ANNUAL_LEAVE",
    employee: {
      firstName: "Enya",
      lastName: "Behm",
      id: "84502153-69e6-4561-b2de-8f21f97530d3",
    },
    approved: true,
  },
];

describe("AbsenceList", () => {
  test("renders list of absences", async () => {
    (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
    render(
      <QueryClientProvider client={queryClient}>
        <AbsenceList />
      </QueryClientProvider>
    );
    const list = await screen.findByRole("list");
    const { findAllByRole } = within(list);
    const items = await findAllByRole("listitem");
    expect(items.length).toBe(2);
  });

  test("renders list with correct end dates", async () => {
    (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
    render(
      <QueryClientProvider client={queryClient}>
        <AbsenceList />
      </QueryClientProvider>
    );
    const list = await screen.findByRole("list");
    const { getByText } = within(list);
    const rahafDate = getByText("End Date: 06/06/2022");
    const enyaDate = getByText("End Date: 13/02/2022");
    expect(rahafDate).toBeInTheDocument();
    expect(enyaDate).toBeInTheDocument();
  });
});
