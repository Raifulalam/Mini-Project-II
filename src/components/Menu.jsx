import React from 'react';
import './Menu.css';

const Menu = ({ menu }) => {
    return (
        <div className="menu-container">
            {Object.keys(menu).map((category) => (
                <div key={category} className="menu-category">
                    <h4 className="menu-category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <ul className="menu-items">
                        {Object.keys(menu[category]).map((item) => (
                            <li key={item} className="menu-item">
                                <span className="menu-item-name">{item}</span>
                                <span className="menu-item-price">${menu[category][item]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Menu;
