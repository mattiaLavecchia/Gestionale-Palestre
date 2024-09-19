const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: [true, "L'accesso deve contenere l'id del customer"],
    },
    paymentDate: {
        type: Date,
        required: [true, "Bisogna inserire gli allenamenti settimanali"],
    },
    price: {
        type: Number,
        required: [true, "Bisogna inserire il prezzo dell'abbonamento"]
    },

})

paymentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'customer',
        select: 'name surname'
    });
    next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;