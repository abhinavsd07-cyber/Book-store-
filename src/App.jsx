import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import PNF from "./pages/PNF";
import Loader from "./components/Loader";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import SingleBook from "./pages/SingleBook";
import AdminHome from "./admin/pages/AdminHome";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminSettings from "./admin/pages/AdminSettings";
import Career from "./pages/Career";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";

function App() {
  const [showHome, setShowHome] = useState(false);

  setTimeout(() => {
    setShowHome(true);
  }, 3000);

  return (
    <>
      <Routes>
        <Route path="/" element={showHome ? <Home /> : <Loader />} />
        <Route path="/books" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/view/:id/book" element={<SingleBook />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-books" element={<AdminBooks />} />
        <Route path="/admin-careers" element={<AdminCareers />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/purchase-success" element={<PaymentSuccess />} />

        <Route path="/purchase-cancel" element={<PaymentFailure />} />

        <Route path="/*" element={<PNF />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
