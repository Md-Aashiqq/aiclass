import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter } from "react-router-dom";
// import MeetingPage from "./Pages/MeetingPage/MeetingPage";
import AppRouter from "./components/Router/Router";
import { initialState } from "./Reducer";
import { reducer } from "./Reducer";
import { DataLayer } from "./DataLayer";
function App() {
  return (
    <DataLayer initialstate={initialState} reducer={reducer}>
      <BrowserRouter>
        <div className="App">
          <AppRouter />
        </div>
      </BrowserRouter>
    </DataLayer>
  );
}

export default App;
