import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserProfile = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        api.get('/user/content')
            .then(response => {
                setContent(response.data);
            })
            .catch(error => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            });
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>User Profile</h3>
            </header>
            <p>
                <strong>Content from server:</strong> {content}
            </p>
        </div>
    );
};

export default UserProfile;