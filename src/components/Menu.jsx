import React, { useContext, useState } from 'react';
import './Menu.css';
import Modal from './Modal';
import { UserContext } from './userContext';

const sampleMenu = [
    { id: 1, name: 'Momo', description: 'Steamed dumplings with fillings', price: 200 },
    { id: 2, name: 'Chowmein', description: 'Stir-fried noodles with vegetables', price: 180 },
    { id: 3, name: 'Pizza', description: 'Cheesy pizza with toppings', price: 500 },
    { id: 4, name: 'Burger', description: 'Juicy burger with fries', price: 350 },
];

const MenuPage = () => {
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

    const addToCart = (item) => {
        const exists = cart.find(cartItem => cartItem.id === item.id);
        if (exists) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="menu-page">
            <h1>Our Menu</h1>
            <div className="menu-container">
                {sampleMenu.map(item => (
                    <div key={item.id} className="menu-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: NPR {item.price}</p>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h2>Cart Summary</h2>
                {cart.length === 0 ? <p>No items in cart.</p> : (
                    <>
                        <ul>
                            {cart.map(item => (
                                <li key={item.id}>
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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Reservation:', reservationDetails);
                            // Save or send to server here
                            setShowModal(false);
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            value={reservationDetails.name}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={reservationDetails.email}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, email: e.target.value })}
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={reservationDetails.phone}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, phone: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Guests"
                            value={reservationDetails.guests}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, guests: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Table Number"
                            value={reservationDetails.tableNumber}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, tableNumber: e.target.value })}
                        />
                        <textarea
                            placeholder="Extra notes or orders"
                            value={reservationDetails.notes}
                            onChange={(e) => setReservationDetails({ ...reservationDetails, notes: e.target.value })}
                        ></textarea>
                        <button type="submit">Confirm order</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default MenuPage;
