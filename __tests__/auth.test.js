const axios = require("axios");
const auth_route = "https://shop-inventory-tq8f.onrender.com/v1/auth";
const shop_route = "https://shop-inventory-tq8f.onrender.com/v1/shop-items";

// test("Registration route", async () => {
//     const response = await axios.post(`${auth_route}/register`, {
//         fullName: "James Bond",
//         username: "jaybee",
//         role: "admin",
//         password: "jaybeeBOND"
//     });

//     expect(response.status).toBe(201);
//     expect(response.data).toBe('User created.');
// });

test("Login route", async () => {
    const response = await axios.post(`${auth_route}/login`, {
        username: 'jaybee',
        password: 'jaybeeBOND'
    });

    global.token = response.data.token;

    expect(response.status).toBe(200);
    expect(typeof(global.token)).toBe('string');
});


test("New Shop Item route", async () => {
    const response = await axios.post(`${shop_route}/`, {
        name: "Laptop",
        description: "Macbook Pro M2",
        price: 1500,
        isInStock: true
    },
    {
        headers: {
            'Authorization': `Bearer ${global.token}`
        }
    });
    global.item_id = response.data['newShopItem']['_id'];

    expect(typeof(response)).toBe('object');

});

test("List Shop Items route", async () => {
    const response = await axios.get(`${shop_route}/item/${global.item_id}`,
    {
        headers: {
            'Authorization': `Bearer ${global.token}`
        }
    });

    expect(typeof(response.data)).toBe('object');

});

test("Delete Item route", async () => {
    const response = await axios.delete(`${shop_route}/item/${global.item_id}`, {
        headers: {
            'Authorization': `Bearer ${global.token}`
        }
    });

    expect(typeof(response.data)).toBe('string');

});