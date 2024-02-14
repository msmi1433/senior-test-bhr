import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AbsenceList from "./components/AbsenceList";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-8">
        <AbsenceList />
      </main>
    </QueryClientProvider>
  );
}

export default App;
