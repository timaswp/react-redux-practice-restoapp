const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART': {
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);

            const existingItemIndex = state.items.findIndex(item => item.id === id);
            
            let updatedItems;
            let total = state.totalPrice;

            if (existingItemIndex >= 0) {
                const existingItem = state.items[existingItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };
                updatedItems = [
                    ...state.items.slice(0, existingItemIndex),
                    updatedItem,
                    ...state.items.slice(existingItemIndex + 1)
                ];
                total += existingItem.price;
            } else {
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    quantity: 1
                };
                updatedItems = [
                    ...state.items,
                    newItem
                ];
                total += newItem.price;
            }

            return {
                ...state,
                items: updatedItems,
                totalPrice: total
            };
        }
        case 'ITEM_REMOVE_FROM_CART': {
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);

            const itemToRemove = state.items[itemIndex];
            let updatedItems;
            let total = state.totalPrice;

            if (itemToRemove.quantity > 1) {
                const updatedItem = {
                    ...itemToRemove,
                    quantity: itemToRemove.quantity - 1
                };
                updatedItems = [
                    ...state.items.slice(0, itemIndex),
                    updatedItem,
                    ...state.items.slice(itemIndex + 1)
                ];
                total -= itemToRemove.price;
            } else {
                updatedItems = [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ];
                total -= itemToRemove.price;
            }

            return {
                ...state,
                items: updatedItems,
                totalPrice: total
            };
        }
        default:
            return state;
    }
}

export default reducer;