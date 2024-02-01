import './styles.css'

function Header(){

    return (
        <header style={{ backgroundColor: '#E8805E', fontFamily: 'Montserrat, sans-serif' }}>
            <h1 style={{ fontSize: '17px', fontFamily: 'Montserrat', textAlign: 'center' , fontWeight: '700', color: '#000000'}}>
                Summer of CS July 29-August 2!  <a href='placeholder.com' className='LeanrMore'>LEARN MORE!</a>
            </h1>
        </header>

//<div style={{ fontSize: '20px' }}>🔍</div> {/* Placeholder for search icon */}

    );
    
};


export default Header;