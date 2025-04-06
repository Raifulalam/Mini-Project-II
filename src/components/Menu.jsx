import React, { useState } from "react";

const Menu = () => {
    const manu = [
        {
            id: 1,
            name: "Pizza",
            price: 150,
            description: "Delicious Italian pizza with tomato sauce, mozzarella, and fresh basil."
        },
        {
            id: 2,
            name: "Burger",
            price: 100,
            description: "Juicy patty served with lettuce, tomatoes, and mayonnaise."
        },
        {
            id: 3,
            name: "Salad",
            price: 80,
            description: "Cucumber, tomatoes, lettuce, olives, and a dressing made with your choice of dressing sauce."
        }
    ];
    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {manu.map((item) =>
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <strong>Price: ${item.price}</strong>

                    </li>)}
            </ul>
        </div>
    )

}
export default Menu;
// This is a simple React component for displaying a menu.
// It uses the map function to iterate over an array of menu items and display each one as
// a list item with a name, description, and price.
// The key prop is used to uniquely identify each menu item in the list.


