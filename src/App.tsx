import { Routes, Route, Navigate } from 'react-router-dom';
import TransactionsPage from './components/Pages/TransactionPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './utils/setupDayjs'
// import MetricsPage from './pages/MetricsPage';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        {/* <Route path="/metrics" element={<MetricsPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </QueryClientProvider>
  );
}
