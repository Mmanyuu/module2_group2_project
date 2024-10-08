import "./App.css";
import Introduction from "./Components/Introduction";
import ViewForm from "./Components/ViewForm";
import ViewMainPage from "./Components/ViewMainPage";

function App() {
  return (
    <div className="App">
      <ViewMainPage />
      <Introduction />
      <ViewForm />
    </div>
  );
}

export default App;
