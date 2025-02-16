import React from 'react';

const MenuCategory = ({ category, items }) => {
    return (
        <div className="menu-category">
            <h3>{category}</h3>
            <ul>
                {Object.entries(items).map(([item, price]) => (
                    <li key={item}>
                        <strong>{item}:</strong> ${price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuCategory;
