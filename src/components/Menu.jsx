import React, { useContext, useEffect, useState } from 'react';
import './Menu.css';
import Modal from './Modal';
import { UserContext } from './userContext';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(UserContext);
    const [reservationDetails, setReservationDetails] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        guests: 1,
        tableNumber: '',
        notes: ''
    });

    // Fetch menu data from backend
    useEffect(() => {
        fetch('http://localhost:3000/api/menu')
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(err => console.error('Error fetching menu:', err));
    }, []);

    const addToCart = (item) => {
        const exists = cart.find(cartItem => cartItem._id === item._id);
        if (exists) {
            setCart(cart.map(cartItem =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Submit the order
    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!user) {
            alert('You must be logged in to place an order.');
            return;
        }

        const orderData = {
            user: user?.id,  // Ensure user._id is passed
            items: cart.map(item => ({
                itemId: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            reservationDetails,
            total: getTotal(),
            status: 'pending'
        };

        try {
            const res = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!res.ok) {
                const errorText = await res.text();  // Get the HTML response
                console.error('Error placing order:', errorText);  // Log HTML error for debugging
                throw new Error('Failed to place order');
            }

            const data = await res.json();
            alert('Order placed successfully!');
            setCart([]);  // Clear cart after placing the order
            setShowModal(false);  // Close the modal
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        }
    };



    return (
        <div className="menu-page">
            <h1>Our Menu</h1>
            <div className="menu-container">
                {menuItems.length === 0 ? (
                    <p>Loading menu...</p>
                ) : (
                    menuItems.map(item => (
                        <div key={item._id} className="menu-item">
                            {item.image && (
                                <img src={item.image} alt={item.name} className="menu-image" />
                            )}
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: INR {item.price}</p>
                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-summary">
                <h2>Cart Summary</h2>
                {cart.length === 0 ? <p>No items in cart.</p> : (
                    <>
                        <ul>
                            {cart.map(item => (
                                <li key={item._id}>
                                    {item.name} x {item.quantity} = NPR {item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total: NPR {getTotal()}</strong></p>
                        <button onClick={() => setShowModal(true)}>Proceed to Order</button>
                    </>
                )}
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>Confirm Your Reservation</h2>
                    <form onSubmit={handleSubmitOrder}>
                        <input type="text" placeholder="Name" value={reservationDetails.name}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, name: e.target.value })} />
                        <input type="email" placeholder="Email" value={reservationDetails.email}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, email: e.target.value })} />
                        <input type="tel" placeholder="Phone" value={reservationDetails.phone}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, phone: e.target.value })} />
                        <input type="number" placeholder="Guests" value={reservationDetails.guests}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, guests: e.target.value })} />
                        <input type="text" placeholder="Table Number" value={reservationDetails.tableNumber}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, tableNumber: e.target.value })} />
                        <textarea placeholder="Extra notes or orders" value={reservationDetails.notes}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, notes: e.target.value })}></textarea>
                        <button type="submit">Confirm order</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default MenuPage;
