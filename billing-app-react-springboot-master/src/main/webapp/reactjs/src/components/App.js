import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import authService from '../services/authService';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import UserProfile from './UserProfile';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute'; // Assuming these are v5 compatible
import AdminRoute from './AdminRoute';   // Assuming these are v5 compatible

const App = () => (
    <Router>
        <AppContent />
    </Router>
);

const AppContent = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            // Ensure roles exist before checking
            setIsAdmin(user.roles && user.roles.includes('ROLE_ADMIN'));
        }
    }, [location]); // Re-run effect when location changes

    const logOut = () => {
        authService.logout();
        setCurrentUser(undefined);
        setIsAdmin(false);
        history.push("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    BillingApp
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {isAdmin && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                         <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                User Page
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="nav-link">{currentUser.username}</span>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                         <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute path="/profile" component={UserProfile} />
                    <AdminRoute path="/admin" component={AdminDashboard} />
                </Switch>
            </div>
        </div>
    );
};

export default App;