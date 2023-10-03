const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authRoute = require("./auth");
const items = require("../schema/shopItems");
const { isUserLoggedIn, isAdmin} = require("./middlewares");

router.use(isUserLoggedIn); // ensure that only logged in users can access the API

// general operations for both admin and default users.
router.get("/", async (req, res) => {
    const allShopItems = await items.find();
    res.json(allShopItems);
});

router.get("/item/:id", async (req, res) => {
    const item = await items.findById(req.params.id);
    if (item == null) {
        res.status(404).send('item-not-found');
    }
    res.json({item});
});


// Admin-only operations
router.post("/", isAdmin, async (req, res) => {
    try {
        const {name, description, price, isInStock} = req.body;
        const {userId} = req.decoded;
        
        const newShopItem = await items.create({
           name, description, price, isInStock, userId: userId
        });
        res.json({
            itemAdded: true,
            newShopItem
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
});

router.patch("/item/:id", isAdmin, async (req, res) => {
    const updatedItem = await items.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        isInStock: req.body.isInStock,
    }, {new: true});

    res.json({
        message: "Item updated",
        updatedItem
    });
});

router.delete("/item/:id", isAdmin, async (req, res) => {
    const item = await items.findByIdAndDelete(req.params.id);

    res.status(204).json({
        message: "Item removed"
    });
});

module.exports = router;