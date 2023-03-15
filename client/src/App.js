import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserHome from "./pages/userHome/UserHome";
import Payment from "./pages/payment/Payment";
import UserBooking from "./pages/userBookings/UserBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<UserHome />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookings" element={<UserBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
