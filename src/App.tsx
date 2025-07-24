import { Routes, Route, Navigate } from 'react-router-dom';
import TransactionsPage from './components/Pages/TransactionPage';
// import MetricsPage from './pages/MetricsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TransactionsPage />} />
      {/* <Route path="/metrics" element={<MetricsPage />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
