const Customer = require('./../models/customerModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllCustomer = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Customer.find(), req.query).paginate();
    const customers = await features.query;
    const countCustomer = await Customer.countDocuments();
    res.status(200).json({
        status: 'success',
        customers,
        countCustomer
    });
});

exports.getCustomer = catchAsync(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return next(new AppError('No customer found with that ID', 404));
    };
    res.status(200).json(customer);
});

exports.createCustomer = catchAsync(async (req, res, next) => {
    const subscriptionExpires = new Date();
    subscriptionExpires.setDate(subscriptionExpires.getDate() + (30 * req.body.subscriptionDuration))
    const statusSubscription = 'in corso';
    const accesses = req.body.weeklyWorkouts * (4 * req.body.subscriptionDuration);
    const newCustomer = {
        ...req.body,
        subscriptionExpires,
        accesses,
        statusSubscription
    }
    const customerSuccess = await Customer.create(newCustomer);
    res.status(201).json(customerSuccess);
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!customer) {
        return next(new AppError('No customer found with that ID', 404));
    };
    res.status(200).json(customer);
});
