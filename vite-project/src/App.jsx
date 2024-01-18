import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import About from './pages/aboutPage/About.jsx';
import Admin from './Admin.jsx';
import DatabaseAdmin from './DatabaseAdmin.jsx';
import NewHome from './pages/newHomePage/NewHome.jsx';
import './styles.css';

function App() {

  return(
    <>
      <Header />
      <Navbar/ >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/DatabaseAdmin/*' element={<DatabaseAdmin />} />
          <Route path='/Home' element={<NewHome />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
