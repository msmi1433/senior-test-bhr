import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import AbsenceList from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchAbsences } from "../../services/api/apiCalls";
import userEvent from "@testing-library/user-event";
import { sortAbsences } from "../../utils/Sorting/sortAbsences";

jest.mock("../../services/api/apiCalls");

afterEach(() => {
  mockQueryClient.clear();
});

const mockQueryClient = new QueryClient();
const mockAbsenceData = sortAbsences(
  [
    {
      id: 0,
      startDate: new Date(
        "Sat May 28 2022 05:39:06 GMT+0100 (British Summer Time)"
      ),
      endDate: new Date(
        "Mon Jun 06 2022 05:39:06 GMT+0100 (British Summer Time)"
      ),
      days: 9,
      absenceType: "SICKNESS",
      employee: {
        firstName: "Rahaf",
        lastName: "Deckard",
        id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
      },
      approved: true,
      conflicts: false,
    },
    {
      id: 1,
      startDate: new Date(
        "Tue Feb 08 2022 08:02:47 GMT+0000 (Greenwich Mean Time)"
      ),
      endDate: new Date(
        "Sun Feb 13 2022 08:02:47 GMT+0000 (Greenwich Mean Time)"
      ),
      days: 5,
      absenceType: "ANNUAL_LEAVE",
      employee: {
        firstName: "Enya",
        lastName: "Behm",
        id: "84502153-69e6-4561-b2de-8f21f97530d3",
      },
      approved: false,
      conflicts: false,
    },
    {
      id: 10,
      startDate: new Date(
        "Sun Apr 19 2022 10:17:57 GMT+0000 (Greenwich Mean Time)"
      ),
      endDate: new Date(
        "Sat May 2 2022 15:56:10 GMT+0000 (Greenwich Mean Time)"
      ),
      days: 13,
      absenceType: "ANNUAL_LEAVE",
      employee: {
        firstName: "Raniya",
        lastName: "Otte",
        id: "e10058e4-3383-466b-91d8-1ea5bf1acf0f",
      },
      approved: false,
      conflicts: true,
    },
  ],
  "startDate",
  "DESC"
);

const renderAbsencesList = () => {
  (fetchAbsences as jest.Mock).mockReturnValue(mockAbsenceData);
  render(
    <QueryClientProvider client={mockQueryClient}>
      <AbsenceList />
    </QueryClientProvider>
  );
};

describe("AbsenceList", () => {
  test("renders list of absences", async () => {
    renderAbsencesList();

    const table = await screen.findByRole("table");
    const { findAllByRole } = within(table);
    const items = await findAllByRole("row");
    expect(items.length).toBe(4);
  });

  test("renders list with correct end dates", async () => {
    renderAbsencesList();

    const table = await screen.findByRole("table");
    const { getByText } = within(table);
    const rahafDate = getByText("06/06/2022");
    const enyaDate = getByText("13/02/2022");
    expect(rahafDate).toBeInTheDocument();
    expect(enyaDate).toBeInTheDocument();
  });

  describe("Sort options", () => {
    test("Can sort by name", async () => {
      const user = userEvent.setup();

      renderAbsencesList();

      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Name"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("Enya");
      await user.click(screen.getByText("Name"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("Raniya");
    });
    test("Can sort by absence type", async () => {
      const user = userEvent.setup();

      renderAbsencesList();

      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Absence Type"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("ANNUAL_LEAVE");
      await user.click(screen.getByText("Absence Type"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("SICKNESS");
    });
    test("Can sort by start date", async () => {
      const user = userEvent.setup();

      renderAbsencesList();

      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Start Date"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("08/02/2022");
      await user.click(screen.getByText("Start Date"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("28/05/2022");
    });
    test("Can sort by end date", async () => {
      const user = userEvent.setup();

      renderAbsencesList();

      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("End Date"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("13/02/2022");
      await user.click(screen.getByText("End Date"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("06/06/2022");
    });
    test("Can sort by approval status", async () => {
      const user = userEvent.setup();

      renderAbsencesList();

      const table = await screen.findByRole("table");
      const { findAllByRole } = within(table);
      await user.click(screen.getByText("Approval Status"));
      let items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("Approved");
      await user.click(screen.getByText("Approval Status"));
      items = await findAllByRole("row");
      expect(items[1]).toHaveTextContent("Pending approval");
    });
  });
});
