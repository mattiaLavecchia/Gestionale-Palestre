const Subscription = require('./../models/subscriptionModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllSubscription = catchAsync(async (req, res, next) => {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
});

exports.getSubscription = async (req, res, next) => {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
        return next(new AppError('No subscription found with that ID', 404));
    };
    res.status(200).json(subscription);
};

exports.createSubscription = catchAsync(async (req, res, next) => {
    const newSubscription = await Subscription.create(req.body);
    res.status(201).json(newSubscription);
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!subscription) {
        return next(new AppError('No subscription found with that ID', 404));
    }
    res.status(200).json(subscription);
});

exports.deleteSubscription = catchAsync(async (req, res, next) => {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
        return next(new AppError('No subscription found with that ID', 404));
    }
    res.status(204).json('Eliminazione corretta');
});