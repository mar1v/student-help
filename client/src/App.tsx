import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRequest from "./pages/CreateRequest";
import Login from "./pages/Login";
import MyRequests from "./pages/MyRequests";
import Register from "./pages/Register";
import RequestDetails from "./pages/RequestDetails";
import Requests from "./pages/Requests";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Requests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/requests/:id" element={<RequestDetails />} />
          <Route path="/mine" element={<MyRequests />} />
          <Route path="/create" element={<CreateRequest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
