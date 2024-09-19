const express = require('express');

const subscriptionController = require('./../controllers/subscriptionController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, subscriptionController.getAllSubscription)
    .post(authController.protect, subscriptionController.createSubscription);

router.route('/:id')
    .get(authController.protect, subscriptionController.getSubscription)
    .patch(authController.protect, subscriptionController.updateSubscription)
    .delete(authController.protect, subscriptionController.deleteSubscription);

module.exports = router;