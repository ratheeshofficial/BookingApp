import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AdminHome from "./pages/admin/AdminHome";
import UserTable from "./pages/admin/UserTable";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login";

function App() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.isAdmin ? <AdminHome /> : <Home />} />
        <Route
          path="/users"
          element={user?.isAdmin ? <UserTable /> : "<Home />"}
        />
        {/* <Route path="/" element={} /> */}
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
