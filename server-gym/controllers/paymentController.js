const Payment = require('./../models/paymentModel');
const Customer = require('./../models/customerModel');
const Subscription = require('./../models/subscriptionModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllPayments = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Payment.find(), req.query).paginate();
    const payments = await features.query
    res.status(200).json(payments);
});

exports.getPayment = catchAsync(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id)
    if (!payment) {
        return next(new AppError('No payment found with that ID', 404));
    };
    res.status(200).json(payment);
});

exports.addPayment = catchAsync(async (req, res, next) => {
    const customer = await Customer.findById(req.body.customer);
    if (!customer) {
        return next(new AppError('No customer found for this payment', 404));
    };
    const subscription = await Subscription.findOne({ subscriptionDuration: customer.subscriptionDuration, weeklyWorkouts: customer.weeklyWorkouts });
    if (!subscription) {
        return next(new AppError('No subscription found for this payment', 404));
    };
    const date = new Date();
    date.setDate(date.getDate() + (30 * customer.subscriptionDuration))
    customer.subscriptionExpires = date;
    customer.statusSubscription = 'in corso';
    customer.accesses = (customer.subscriptionDuration * 4) * customer.weeklyWorkouts;
    await Customer.findByIdAndUpdate(req.body.customer, customer);
    req.body.paymentDate = new Date();
    req.body.price = subscription.price;
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
});

exports.deletePayment = catchAsync(async (req, res, next) => {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
        return next(new AppError('No payment found with that ID', 404));
    };
    res.status(204).json({ message: 'Success delete' });
});
