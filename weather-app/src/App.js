import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ResponsesProvider } from './Context/ResponsesContext'; // Import the ResponsesProvider
import Introduction from './Components/Introduction';
import MainPage from './Components/MainPage';


function App() {

  return (
    <div className="App">
      <ResponsesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/MainPage" element={<MainPage />} />
          </Routes>
        </Router>
      </ResponsesProvider>
      {/* <ViewMainPage /> */}
      {/* <Introduction /> */}
      {/* <EditForm /> */}
    </div>
  );
}

export default App;
