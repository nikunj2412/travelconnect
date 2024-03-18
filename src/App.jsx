import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddPackage from "./pages/AddPackage";
import TourPackage from "./pages/TourPackage";
import TourismPlaces from "./pages/LocalTourismPlaces";
import Rating from "./pages/Rating";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="/add-packages" element={<AddPackage />} />
          <Route path="/packages" element={<TourPackage />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/places" element={<TourismPlaces />} />
        </Route>
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
