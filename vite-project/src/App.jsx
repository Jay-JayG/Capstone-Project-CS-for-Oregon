import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Admin from './Admin.jsx';
import DatabaseAdmin from './DatabaseAdmin.jsx';
import './styles.css';

function App() {

  return(
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/DatabaseAdmin/*' element={<DatabaseAdmin />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
