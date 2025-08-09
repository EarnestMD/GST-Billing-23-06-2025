import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        api.get('/admin/content')
            .then(response => {
                setContent(response.data);
            })
            .catch(error => {
                const _content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            });
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Admin Dashboard</h3>
            </header>
            <p>
                <strong>Content from server:</strong> {content}
            </p>
        </div>
    );
};

export default AdminDashboard;