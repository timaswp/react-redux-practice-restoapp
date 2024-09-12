const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    };
};

const menuError = () => {
    return {
        type: 'MENU_ERROR'
    }
};

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
};

const deletedFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
};

const orderSubmited = () => {
    return {
        type: 'ORDER_SUCCESS'
    }
};

const orderError = () => {
    return {
        type: 'ORDER_ERROR'
    }
};

const orderReset = () => {
    return {
        type: 'ORDER_RESET'
    }
};

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deletedFromCart,
    orderSubmited,
    orderError,
    orderReset
};