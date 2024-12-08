const OrderService = {
    saveOrder: (order) => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    },

    getOrders: () => {
        return JSON.parse(localStorage.getItem('orders')) || [];
    },

    clearOrders: () => {
        localStorage.removeItem('orders');
    },
};

export default OrderService;
