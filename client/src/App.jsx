import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Cart, Dashboard, Home, Login, Menu, Product, Register, Orders, OrderTracking, MyOrders } from "./pages";
import Footer from "./components/Footer";
import NotFoundPage from "./components/Error";
import Navbar from "./components/Navbar";
import Payment from './components/Payment';
import Contact from "./components/contactUs/Contact";
import BlogMain from "./components/Blog/BlogMain";
import BlogViewDetails from "./components/Blog/BlogViewDetails";
import ScrollTop from "./scroll/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Search from "./components/search/Search";

function App() {
  const user = useSelector((state) => state.user);
  const isAdmin = user.currentUser?.user?.isAdmin;

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <ScrollTop>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/error" element={<NotFoundPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={isAdmin ? <Dashboard /> : <NotFoundPage />} />
          <Route path="/myorders/:userId" element={user.currentUser ? <MyOrders /> : <NotFoundPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu/:keyword" element={<Menu />} />
          <Route path="/orders/:id" element={<Orders />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="products">
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="login" element={!user.currentUser ? <Login /> : <NotFoundPage />} />
          <Route path="/register" element={!user.currentUser ? <Register /> : <NotFoundPage />} />
          <Route path="/payment" element={<Payment />} />

          <Route exact path="/blog" element={<BlogMain />} />
          <Route
            exact
            path="/blog/blogdata/:id"
            element={<BlogViewDetails />}
          />
        </Routes>
      </ScrollTop>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
