const mongoose = require('mongoose');

const accesSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: [true, "L'accesso deve contenere l'id del customer"],
    },
    access: {
        type: Date,
        required: [true, "Bisogna inserire le informazioni di accesso"],
    },
})

accesSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'customer',
        select: 'name surname subscriptionExpires'
    });
    next();
});

const Access = mongoose.model('Access', accesSchema);

module.exports = Access;
