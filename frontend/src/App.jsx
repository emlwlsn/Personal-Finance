import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/login';
import { FinancialRecordProvider } from './contexts/financial-record-context.jsx';
import { UserButton, SignedIn } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
          <SignedIn>
                <UserButton/>
          </SignedIn>
        </div>
        <Routes>
          <Route path="/" element={<FinancialRecordProvider>
            <Dashboard />
          </FinancialRecordProvider>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
