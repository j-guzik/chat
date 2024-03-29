import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Chat from "./components/chat/Chat";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/chat/login" element={<Login />} />
          <Route path="/chat/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Chat />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
