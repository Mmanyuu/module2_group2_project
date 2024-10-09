// src/App.js
// This will the start point of the App
// previously this was the App file.
// Can merge this code  to the main  "App.js" file to call the introduction page.which is needed to call the datas and responses using the context hook

// This file is a refernce file until we integrate and see the functions working.
// Once the app is functional no need this Appcopy

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ResponsesProvider } from './Context/ResponsesContext'; // Import the ResponsesProvider
import Introduction from './Components/Introduction';
import MainPage from './Components/MainPage';

const Appcopy = () => {
  return (
    <ResponsesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
      </Router>
    </ResponsesProvider>
  );
};

export default Appcopy;