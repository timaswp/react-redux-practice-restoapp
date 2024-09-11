import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, addedToCart } from '../../actions';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../spinner';
import Error from '../error';
import './item-page.scss';

const ItemPage = ({RestoService, menuLoaded, menuRequested, menuError, menuItems, loading, error, addedToCart}) => {
    const { id } = useParams();

    useEffect(() => {
        if(menuItems.length === 0){
            menuRequested();

            RestoService.getMenuItems()
                .then(res => menuLoaded(res))
                .catch(() => menuError());
        }
    }, [RestoService, menuLoaded, menuRequested, menuError, menuItems]);

    if(loading) {
        return (
            <div className="item_page">
                <Spinner/>
            </div>
        );
    }

    if(error) {
        return (
            <div className="item_page">
                <Error/>
            </div>
        );
    }

    const item = menuItems.find(el => +el.id === +id);

    if (!item) {
        return (
            <div className="item_page">
                <div className='item_block item_error'>
                    <div className='item_error_text'>
                        Item not found
                    </div>
                    <Link to={`/`}>
                        <button className="menu__btn menu__btn_back">Back</button>
                    </Link>
                </div> 
            </div>
        )
    }

    const { title, url, category, price } = item;

    return (
        <div className="item_page">
            <div className="menu__item item_block">
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">Category: <span>{category}</span>
                    <span><img src={`./icons/${category}.svg`} alt={category}/></span>
                </div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <div className="menu__btns">
                    <button onClick={() => addedToCart(id)} className="menu__btn">Add to cart</button>
                    <NavBtns itemId={id} menuItems = {menuItems}/>
                    <Link to={`/`}>
                        <button className="menu__btn menu__btn_back">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const NavBtns = ({itemId, menuItems}) => {
    if(+itemId === 1) {
        return (
            <Link to={`/${+itemId+1}`}>
                <button className="menu__btn">Next →</button>
            </Link>
        )
    } else if (+itemId === menuItems.length) {
        return (
            <Link to={`/${+itemId-1}`}>
                <button className="menu__btn">← Previous</button>
            </Link>
        )
    } else {
        return (
            <>
                <Link to={`/${+itemId-1}`}>
                    <button className="menu__btn">← Previous</button>
                </Link>
                <Link to={`/${+itemId+1}`}>
                    <button className="menu__btn">Next →</button>
                </Link>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));