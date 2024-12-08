const FavoriteService = {
    saveOrder: (orders) => {
        //const orders = JSON.parse(localStorage.getItem('favorites')) || [];
        //orders.push(order);
        localStorage.setItem('favorites', JSON.stringify(orders));
    },

    getOrders: () => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    },

    clearOrders: () => {
        localStorage.removeItem('favorites');
    },
};

export default FavoriteService;
