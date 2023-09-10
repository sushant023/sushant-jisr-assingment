import { FileExplorer } from "./components";

import { Files } from "./api/data";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="FileExplorer__container">
        <FileExplorer data={Files} />
      </div>

      <div className="code__area">
        <h3>Sushant Bhaskar Assignment</h3>
      </div>
    </div>
  );
}

export default App;
