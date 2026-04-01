import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./pages/ErrorBoundary";
import FlightContextProvider from "./context/FlightContext";

const queryClient = new QueryClient();

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <FlightContextProvider>
          <RouterProvider router={router} />
        </FlightContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
