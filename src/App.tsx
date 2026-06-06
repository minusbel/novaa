import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Business from './pages/Business';
import LoansPage from './pages/LoansPage';
import Investments from './pages/Investments';
import ResourcesPage from './pages/ResourcesPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveChatWidget from './components/LiveChatWidget';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans text-brand-primary bg-brand-muted selection:bg-brand-accent/30 selection:text-brand-primary">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/business" element={<Business />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <LiveChatWidget />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
