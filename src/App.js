// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage';
import Loginpage from './views/Loginpage';
import Dashboard from './views/Dashboard';
import Navbar from './views/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/" element={<Homepage />} />
          {/* Protected route */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
