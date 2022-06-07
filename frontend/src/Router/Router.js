import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import NovoAmigoSecreto from '../Pages/NovoAmigoSecreto';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import { AppContext } from '../Context/AppContext';

function Router() {
  const [userDetails, setUserDetails] = useState({});
  const [showLogin, setShowLogin] = useState(false)

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{ userDetails, showLogin, setUserDetails, setShowLogin }}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/novo-amigo-secreto" element={<NovoAmigoSecreto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default Router;