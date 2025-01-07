import Stock from "./components/client/stock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <div className="wrapper w-full h-screen bg-zinc-800 overflow-x-hidden flex items-start justify-center">
        <QueryClientProvider client={queryClient}>
          <Stock />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
