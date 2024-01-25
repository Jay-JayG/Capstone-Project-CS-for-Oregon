import { Outlet, Link } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Root() {
    return (
        <>
      <div id="sidebar">
        <Header />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
    );
}