import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import AbsenceList from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/api/apiCalls");

afterEach(() => {
  queryClient.clear();
});

const queryClient = new QueryClient();
const mockAbsenceData = [
  {
    id: 0,
    startDate: "Sat May 28 2022 05:39:06 GMT+0100 (British Summer Time)",
    endDate: "Mon Jun 06 2022 05:39:06 GMT+0100 (British Summer Time)",
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
    startDate: "Tue Feb 08 2022 08:02:47 GMT+0000 (Greenwich Mean Time)",
    endDate: "Sun Feb 13 2022 08:02:47 GMT+0000 (Greenwich Mean Time)",
    days: 5,
    absenceType: "ANNUAL_LEAVE",
    employee: {
      firstName: "Enya",
      lastName: "Behm",
      id: "84502153-69e6-4561-b2de-8f21f97530d3",
    },
    approved: false,
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
    const table = await screen.findByRole("table");
    const { findAllByRole } = within(table);
    const items = await findAllByRole("row");
    expect(items.length).toBe(3);
  });

  test("renders list with correct end dates", async () => {
    (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
    render(
      <QueryClientProvider client={queryClient}>
        <AbsenceList />
      </QueryClientProvider>
    );
    const table = await screen.findByRole("table");
    const { getByText } = within(table);
    const rahafDate = getByText("06/06/2022");
    const enyaDate = getByText("13/02/2022");
    expect(rahafDate).toBeInTheDocument();
    expect(enyaDate).toBeInTheDocument();
  });

  describe.only("Sort options", () => {
    test("Can sort by name", async () => {
      (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
      const user = userEvent.setup();
      render(
        <QueryClientProvider client={queryClient}>
          <AbsenceList />
        </QueryClientProvider>
      );
      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Name"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("Enya");
      await user.click(screen.getByText("Name"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("Rahaf");
    });
    test("Can sort by absence type", async () => {
      (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
      const user = userEvent.setup();
      render(
        <QueryClientProvider client={queryClient}>
          <AbsenceList />
        </QueryClientProvider>
      );
      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Absence Type"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("ANNUAL_LEAVE");
      await user.click(screen.getByText("Absence Type"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("SICKNESS");
    });
    test.only("Can sort by start date", async () => {
      (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
      const user = userEvent.setup();
      render(
        <QueryClientProvider client={queryClient}>
          <AbsenceList />
        </QueryClientProvider>
      );
      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Start Date"));

      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("08/02/2022");
      await user.click(screen.getByText("Start Date"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("28/05/2022");
    });
  });
});
