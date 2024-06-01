const Access = require('./../models/accessModel');
const Customer = require('./../models/customerModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllAccess = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Access.find(), req.query).sort().paginate();
    const accesses = await features.query;
    const countAccess = await Access.countDocuments();
    res.status(200).json({
        status: 'success',
        accesses,
        countAccess
    });
});

exports.getAcces = catchAsync(async (req, res, next) => {
    const access = await Access.findById(req.params.id)
    if (!access) {
        return next(new AppError('No access found with that ID', 404));
    };
    res.status(200).json(access);
});

exports.createAccess = catchAsync(async (req, res, next) => {
    const customer = await Customer.findById(req.body.customer);
    if (!customer) {
        return next(new AppError('No customer found for this access', 404));
    };
    customer.accesses--;
    if (customer.accesses <= 3) {
        if (customer.accesses === 0) {
            customer.statusSubscription = 'scaduto'
        } else {
            customer.statusSubscription = 'in scadenza'
        }
    };
    await Customer.findByIdAndUpdate(req.body.customer, customer);
    req.body.access = new Date();
    req.body.idCustomer
    const newAccess = await Access.create(req.body);
    res.status(201).json(newAccess);
});

exports.deleteAccess = catchAsync(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return next(new AppError('No customer found with that access', 404));
    };
    customer.accesses++;
    await Customer.findByIdAndUpdate(req.body.idCustomer, customer);
    const access = await Access.findByIdAndDelete(req.params.id);
    if (!access) {
        return next(new AppError('No access found with that ID', 404));
    };
    res.status(204).json({ message: 'Cancellato con successo' });
});
