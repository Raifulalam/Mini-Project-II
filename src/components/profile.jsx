import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';

const UserProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">No user found. Please log in.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={user.avatar || '/boy.png'}
                        alt={user.name || 'User'}
                        className="w-28 h-28 rounded-full shadow mb-4 object-cover"
                    />
                    <h2 className="text-2xl font-semibold mb-1">{user.name || 'N/A'}</h2>
                    <p className="text-gray-500 mb-4">{user.email || 'N/A'}</p>
                    <p>{user.phone}</p>

                    <div className="w-full flex justify-between mt-6">
                        <Link
                            to="/edit-profile"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
                        >
                            Edit Profile
                        </Link>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
                        </li>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
