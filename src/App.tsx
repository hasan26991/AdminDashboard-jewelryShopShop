import Home from "pages/home/Home";
import { Outlet, Route, Routes } from "react-router-dom";
import Users from "pages/users/Users";
import Products from "pages/products/Products";
import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import Menu from "components/menu/Menu";
import Login from "pages/login/Login";
import "styles/main.scss";
import User from "pages/user/User";
import Product from "pages/product/Product";
import Test from "pages/Test";
import ProtectedRoute from "./components/ProtectedRoute";
import "utils/amplifyConfig";
import TestForm from "./pages/TestForm";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/test" element={<Test />} />
          <Route path="/testform" element={<TestForm />} />
        </Route>
      </Route>
      <Route path="login/" element={<Login />} />
    </Routes>
  );
}

export default App;
