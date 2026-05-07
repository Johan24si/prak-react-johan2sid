export const customers = Array.from({ length: 30 }, (_, i) => ({
    customerId: `CUST-${1000 + i}`,
    customerName: `Customer ${i + 1}`,
    email: `customer${i + 1}@mail.com`,
    phone: `08123${100000 + i}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3]
}));