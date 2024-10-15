import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ResponsesProvider } from "./Context/ResponsesContext";
import Introduction from "./Components/Introduction";
import MainPage from "./Components/MainPage";
import RedirectOnRefresh from "./Components/RedirectOnRefresh";
import FourDayForecastNew from "./Components/FourDayForecastNew";

function App() {
  return (
    <div className="App">
      <ResponsesProvider>
        <Router>
          <RedirectOnRefresh>
            <Routes>
              <Route path="/" element={<Introduction />} />{" "}
              <Route path="/MainPage" element={<MainPage />}>
                <Route
                  path="/MainPage/FourDayForecastNew"
                  element={<FourDayForecastNew />}
                />{" "}
              </Route>
            </Routes>
          </RedirectOnRefresh>
        </Router>
      </ResponsesProvider>
    </div>
  );
}

export default App;
