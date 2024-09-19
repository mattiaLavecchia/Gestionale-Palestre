const express = require('express');
const customerController = require('../controllers/customerController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.route('/')
    .get(authController.protect, customerController.getAllCustomer)
    .post(authController.protect, customerController.createCustomer)

router.route('/:id')
    .get(authController.protect, customerController.getCustomer)
    .patch(authController.protect, customerController.updateCustomer)

module.exports = router;