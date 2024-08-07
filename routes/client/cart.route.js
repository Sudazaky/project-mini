const express = require('express');
const router = express.Router();
const controller = require('../../controller/client/cart.controller.js');

router.get("/", controller.index);

router.post("/add/:productId", controller.cartPost);

router.get("/delete/:productId", controller.delete);

router.get("/update/:productId/:quantity", controller.update);

module.exports = router;