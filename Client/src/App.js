import "@fontsource/irish-grover";
import "@fontsource/rubik-bubbles";
import "./vars.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Order from "./components/Order";
import About from "./components/About";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart/Cart.jsx";
import AdminPage from "./components/AdminPage.jsx";
import MyOrders from "./components/MyOrders.jsx";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/myOrders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
