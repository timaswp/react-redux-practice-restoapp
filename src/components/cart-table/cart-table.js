import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { deletedFromCart, orderError, orderReset, orderSubmited } from '../../actions';
import { Link } from 'react-router-dom';
import WithRestoService from '../hoc';

const CartTable = ({items, deletedFromCart, RestoService, orderStatus, orderSubmited, orderError, orderReset}) => {

    const submitOrder = async () => {
        try {
            await RestoService.setOrder(CreateOrder(items));
            orderSubmited();
        } catch (error) {
            console.error('Failed to submit order:', error);
            orderError();
        }
    };



    if (items.length === 0){
        return (
            <>
                <div className="cart__title">Your cart is empty :(</div>
                <Link className="cart__link" to={'/'}>
                    <button className="cart__btn cart__btn_back">Back</button>
                </Link>
            </>         
        )
    }

    if (orderStatus === 'success') {
        return (
            <>
                <div className="cart__title">Order submitted successfully!</div>
                <Link className="cart__link" to={'/'}>
                    <button onClick={() => orderReset()} className="cart__btn">Make a new order</button>
                </Link>
            </>
        )
    }

    return (
        <>
            <div className="cart__title">Your order:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, quantity} = item;
                        
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$ x {quantity}</div>
                                <div onClick={() => deletedFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
                <button onClick={() => submitOrder()} className="cart__btn">Submit order</button>
            </div>

            {orderStatus === 'error' && <div className="cart__error">Failed to submit order. Please try again.</div>}
        </>
    );
};

const CreateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            quantity: item.quantity
        }
    });
    return newOrder;
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        orderStatus: state.orderStatus
    }
};

const mapDispatchToProps = {
    deletedFromCart,
    orderSubmited,
    orderError,
    orderReset
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));