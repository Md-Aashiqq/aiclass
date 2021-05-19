import { BrowserRouter } from "react-router-dom";
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
