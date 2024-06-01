const express = require('express');
const accessController = require('./../controllers/accessController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, accessController.getAllAccess)
    .post(authController.protect, accessController.createAccess)

router.route('/:id')
    .get(authController.protect, accessController.getAcces)
    .delete(authController.protect, accessController.deleteAccess)

module.exports = router;