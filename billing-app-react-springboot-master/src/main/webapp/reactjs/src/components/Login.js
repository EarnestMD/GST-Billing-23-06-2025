import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setMessage({ text: location.state.message, type: 'success' });
        }
    }, [location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        try {
            // The backend returns the user object on success
            await authService.login(username, password);
            // Navigate to the main application page after successful login
            history.push('/home'); // The '/home' route is defined in App.js
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage({ text: resMessage, type: 'danger' });
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group mt-3">
                        <button className="btn btn-primary btn-block" type="submit">
                            <span>Login</span>
                        </button>
                    </div>

                    {message.text && (
                        <div className="form-group mt-3">
                            <div className={`alert alert-${message.type}`} role="alert">
                                {message.text}
                            </div>
                        </div>
                    )}
                </form>
                <p className="mt-3">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;