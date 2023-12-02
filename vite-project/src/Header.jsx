
function Header(){

    return (
        <header style={{ backgroundColor: '#C4DACD', fontFamily: 'Montserrat, sans-serif' }}>
            <h1 style={{ fontSize: '36px', textAlign: 'right' , fontWeight: '300'}}>COMPUTER SCIENCE FOR ALL IN OREGON</h1>
            <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
                    <li style={{ marginRight: '20px' }}><a href='/' className="navLink">Home</a></li>
                    <li style={{ marginRight: '20px' }}><a href='/About' className="navLink">About</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">Services</a></li>
                    <li style={{ marginRight: '20px' }}><a href='#' className="navLink">Contact</a></li>
                </ul>
                <div style={{ fontSize: '20px' }}>🔍</div> {/* Placeholder for search icon */}
            </nav>
        </header>
    );
    
};


export default Header;