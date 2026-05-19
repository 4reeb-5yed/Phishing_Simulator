// =============================================
// APP ROOT - ROUTER CONFIGURATION
// =============================================
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Layout } from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Generator from './pages/Generator.jsx';
import Campaigns from './pages/Campaigns.jsx';
import Education from './pages/Education.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/education" element={<Education />} />
          </Routes>
        </Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: 'rgb(var(--color-surface-raised))',
              color: 'rgb(var(--color-tx-primary))',
              border: '1px solid rgb(var(--color-surface-border))',
              fontSize: '13px',
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
            success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}