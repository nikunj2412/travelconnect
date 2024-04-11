import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddPackage from "./pages/AddPackage";
import TourPackage from "./pages/TourPackage";
import TourismPlaces from "./pages/LocalTourismPlaces";
import PackageRating from "./pages/PackageRating";
import EditPackage from "./components/Packages/EditPackage";
import Booking from "./pages/Booking";
import UserRating from "./pages/UserRating";
import Support from "./pages/Support";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="/add-packages" element={<AddPackage />} />
          <Route path="/packages" element={<TourPackage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/rating" element={<UserRating />} />
          <Route path="/places" element={<TourismPlaces />} />
          <Route path="/update-package/:id" element={<EditPackage />} />
          <Route path="/package-rating" element={<PackageRating />} />
          <Route path="/support" element={<Support />} />
        </Route>
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
