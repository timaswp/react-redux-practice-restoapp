import React from 'react';
import './menu-list-item.scss';
import { Link } from 'react-router-dom';

const MenuListItem = ({menuItem}) => {
    const {title, price, url, category, id} = menuItem;

    return (
        <li className="menu__item">
            <Link to={`/${id}`}>
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt="Cesar salad"></img>
                <div className="menu__category">Category: <span>{category}</span><span><img src={`./icons/${category}.svg`} alt='category'/></span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <button className="menu__btn">Add to cart</button>
            </Link>
        </li>
    )
}

export default MenuListItem;