import { useState } from 'react';

function Login_form(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        //Login API functionality
        console.log(username + password);
        alert(username + password);
    };
    return(
        <>
            <div className='Container'>
                <h2>Database login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='inputContainer'>
                        <p>Username</p>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' />
                    </div>
                    <div className='inputContainer'>
                        <p>Password</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='text' />
                    </div>
                    <div className='fourmSubmit'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login_form;