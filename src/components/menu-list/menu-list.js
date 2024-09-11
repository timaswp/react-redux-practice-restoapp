import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, addedToCart } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';


import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        const {RestoService, menuRequested, menuLoaded, menuError} = this.props;

        menuRequested();

        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(() => menuError());
    }

    render() {
        const {menuItems, loading, error, addedToCart} = this.props;

        if (loading) {
            return <Spinner/>
        }

        if (error) {
            return <Error/>
        }

        const items = menuItems.map(menuItem => {
            return <MenuListItem
                        key = {menuItem.id} 
                        menuItem = {menuItem}
                        onAddToCart={() => addedToCart(menuItem.id)}/>
        });

        return (
            <View items = {items}/>
        )
    }
};

const View = ({items}) => {
    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
};

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

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));