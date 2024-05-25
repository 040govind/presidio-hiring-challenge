//import React from 're'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Protected,Seller } from "./midleware/auth";
//import Navbar from "./component/Navbar";
import './styles/app.css'
import Layout from "./component/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import SellerProperty from "./pages/SellerProperty";
import UpdateProperty from "./pages/UpdateProperty";
import PropertyItem from "./pages/PropertyItem";
function App() {
  return (
   <>
    <Router>
      <Routes>
      <Route
            path="/"
            element={
                <Layout>
                 {" "}
                  <Home/>
                </Layout>
            }
          />
          <Route
            path="/register"
            element={
                <Layout>
                 {" "}
                  <Register/>
                </Layout>
            }
          />
          <Route
            path="/login"
            element={
                <Layout>
                 {" "}
                  <Login/>
                </Layout>
            }
          />
          <Route
            path="/add-property"
            element={
                <Seller>
                  <Layout>
                 {" "}
                  <AddProperty/>
                </Layout>
                </Seller>
            }
          />
          <Route
            path="/view-properties"
            element={
                <Seller>
                  <Layout>
                 {" "}
                  <SellerProperty/>
                </Layout>
                </Seller>
            }
          />
           <Route
            path="/update-property/:id"
            element={
                <Seller>
                  <Layout>
                 {" "}
                  <UpdateProperty/>
                </Layout>
                </Seller>
            }
          />
         <Route
            path="/view-list"
            element={
                <Protected>
                  <Layout>
                 {" "}
                  <PropertyItem/>
                </Layout>
                </Protected>
            }
          />
      </Routes>
    </Router>
   </>
  );
}

export default App;
