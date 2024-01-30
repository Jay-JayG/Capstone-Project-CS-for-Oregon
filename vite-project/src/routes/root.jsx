import { Outlet, Link } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import NavigationBar from "../Navigationbar";
import Footer from "../Footer";

export default function Root() {
    return (
        <>
      <div id="sidebar">
        <Header />
        <NavigationBar />
        <Outlet />
        <Footer />
      </div>
    </>
    );
}