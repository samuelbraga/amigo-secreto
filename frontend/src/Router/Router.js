import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import NovoAmigoSecreto from '../Pages/NovoAmigoSecreto';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import { AppContext } from '../Context/AppContext';
import Snackbar from '@mui/material/Snackbar';

function Router() {
  const [userDetails, setUserDetails] = useState({});
  const [showLogin, setShowLogin] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{ userDetails, showLogin, setUserDetails, setShowLogin, setIsVisible, setFeedbackMessage }}
      > 
        <Snackbar
          open={isVisible}
          message={feedbackMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
          key={'top center'}
        />
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