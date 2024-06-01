const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, paymentController.getAllPayments)
    .post(authController.protect, paymentController.addPayment)

router.route('/:id')
    .get(authController.protect, paymentController.getPayment)
    .delete(authController.protect, paymentController.deletePayment);

module.exports = router;