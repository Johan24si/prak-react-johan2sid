export const orders = Array.from({ length: 30 }, (_, i) => ({
    orderId: `ORD-${1000 + i}`,
    customerName: `Customer ${i + 1}`,
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    totalPrice: 100000 + i * 50000,
    orderDate: `2026-05-${(i % 30) + 1}`
}));