import './styles.css'

function Navbar(){

    return (
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='fixedNav'>
                <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
                    <li style={{ marginRight: '20px' }}><a href='/' className="navLink">Home</a></li>
                    <li style={{ marginRight: '20px' }}><a href='/About' className="navLink">About</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">The Data</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">CS Educators</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">Research & Policy</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">News & Features</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">Take Action</a></li>
                </ul>
                
            </nav>
    );


};

export default Navbar;