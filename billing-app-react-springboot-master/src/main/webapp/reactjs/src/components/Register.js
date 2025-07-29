import React, { useState } from 'react';
import authService from '../services/authService';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        try {
            await authService.register(username, password);
            // Navigate to login page with a success message
            history.push('/login', {
                message: 'Registration successful! Please log in.',
            });
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
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
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
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;