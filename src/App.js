import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from './context/AuthContext';

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
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} exact />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} exact />
          <Route path="/" element={<Homepage />} exact />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;