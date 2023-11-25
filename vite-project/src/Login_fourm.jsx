function Login_fourm(){

    return(
        <>
            <div className='Container'>
                <h2>Database login</h2>
                <fourm onSubmit={(e) => e.preventDefault()}>
                    <div className='inputContainer'>
                        <p>Username</p>
                        <input type='text' />
                    </div>
                    <div className='inputContainer'>
                        <p>Password</p>
                        <input type='text' />
                    </div>
                    <div className='fourmSubmit'>
                        <button type='submit'>Login</button>
                    </div>
                </fourm>
            </div>
        </>
    );
};

export default Login_fourm;