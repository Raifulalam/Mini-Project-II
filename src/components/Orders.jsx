import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Order.css';
import { UserContext } from './userContext';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }

                const userId = user?.id;
                if (!userId) {
                    console.error('No user ID found');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/orders/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className="orders">
            <h3>My Orders</h3>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            {/* Restaurant and Status */}
                            <div className="order-header">
                                <span className="order-restaurant">{order?.restaurant?.name || 'Restaurant'}</span>
                                <span className={`order-status ${order.status?.toLowerCase()}`}>
                                    {order.status || 'Pending'}
                                </span>
                            </div>

                            {/* Reservation Details */}
                            <div className="reservation-details">
                                <h4>Reservation Details</h4>
                                <p><strong>Name:</strong> {order.reservationDetails.name}</p>
                                <p><strong>Email:</strong> {order.reservationDetails.email || 'N/A'}</p>
                                <p><strong>Phone:</strong> {order.reservationDetails.phone || 'N/A'}</p>
                                <p><strong>Guests:</strong> {order.reservationDetails.guests}</p>
                                <p><strong>Table Number:</strong> {order.reservationDetails.tableNumber}</p>
                                <p><strong>Notes:</strong> {order.reservationDetails.notes || 'None'}</p>
                            </div>

                            {/* Order Items */}
                            <div className="order-items">
                                <h4>Items</h4>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - {item.quantity} x INR {item.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Total Price */}
                            <div className="order-total">
                                <p><strong>Total:</strong> INR {order.total}</p>
                            </div>

                            {/* Order Date */}
                            <div className="order-date">
                                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-US')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
