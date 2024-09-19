const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const customersRoutes = require('./routes/customersRoutes');
const subscriptionRoutes = require('./routes/subscriptionsRoutes');
const accessRoutes = require('./routes/accessRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//     hpp({
//       whitelist: [
//       ]
//     })
//   );


app.use('/access', accessRoutes);
app.use('/customers', customersRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/payments', paymentsRoutes);

app.use('/users', userRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;