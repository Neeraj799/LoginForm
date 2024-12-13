import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
